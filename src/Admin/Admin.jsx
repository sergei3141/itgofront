import * as React from 'react';
import HeaderTeacher from '../Header/HeaderTeacher'
import AdminCreateUser from './AdminCreateUser'
import AdminChangeUser from './AdminChangeUser'
import css from './Admin.module.css'

import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { getAllCourses, getAllUsers, getGroups, createNewGroup, authMe } from '../API/API';
import { Button } from 'antd';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';
 

{/* =================  CREATE NEW GROUP JS START  ================= */}
function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
{/* =================  CREATE NEW GROUP JS END  ================= */}

export default function Admin() {

  const notifyError = () => toast.error("Заполните все поля!");
  const notifySucces = () => toast.success("Группа создана!");

  const [myRole, setMyRole] = React.useState()
  const [users, setUsers] = React.useState(['',''])
  const [courses, setCourses] = React.useState(['',''])
  const [coursesChosen, setCoursesChosen] = React.useState()
  const [currentGroupNumber, setCurrentGroupNumber] = React.useState()

  React.useEffect(()=>{
    authMe().then((data)=>{
      setMyRole(data.role)
    })

    getAllUsers().then((data)=>{
      setUsers(data.data)
    })

    getAllCourses().then((data)=>{
      data.data = data.data.map((el)=>{return{
        label: el.name,
        id: el.id
      }})
      setCourses(data.data)
    })
  },[])

{/* =================  CREATE NEW GROUP JS START  ================= */}
const {
  getRootProps,
  getInputLabelProps,
  getInputProps,
  getTagProps,
  getListboxProps,
  getOptionProps,
  groupedOptions,
  value,
  focused,
  setAnchorEl,
} = useAutocomplete({
  id: 'customized-hook-demo',
  defaultValue: [],
  multiple: true,
  options: users,
  getOptionLabel: (option) => option.name,
});

  function sendNewGroup () {
    let obj = new FormData()
    let string = ''
    debugger
    for(let i = 0; i < value.length; i++){string = string + value[i].id + ','}; string = string.substring(0, string.length - 1)                       // users id parse
    for(let i = 0; i < courses.length; i++){if(courses[i].label === document.getElementById('combo-box-demo').value){obj.append('course_id', courses[i].id)}}  // course id parse
    obj.append('users_id', string);
    obj.append('name', (coursesChosen + '_' + currentGroupNumber))
    console.log(obj.get('users_id'))
    if(obj.get('users_id') && obj.get('course_id') && obj.get('name')){
      createNewGroup(obj).then((data)=>{
        if(data?.status == 200){
          notifySucces()
          window.location.reload();
        }})
    }else{
      notifyError();
    }
  }

  {/* =================  CREATE NEW GROUP JS END  ================= */}

  if(myRole == 'admin'){
  return (
    <div className={css.teacher}>
      <HeaderTeacher data={myRole}/>
{/* =================  CREATE NEW GROUP HTML START  ================= */}
      <div className={css.card}>
        <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)'}}><b>Создать группу</b></div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Root>
        <div {...getRootProps()}>
        <div style={{marginBottom:'8px'}}>Список студентов</div>
          <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''} style={{minHeight:'54px', width:'500px', marginTop:'11px'}}>
            {value.map((option, index) => (
              <StyledTag label={option.name} {...getTagProps({ index })} />
            ))}
            <input {...getInputProps()} style={{minHeight:'54px'}} id='form1'/>
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.name}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </Root>
      <div>
        <div style={{marginBottom:'8px'}}>Выберите курс</div>
        <Autocomplete
        onChange={(e)=>{
          setCoursesChosen(e.target.innerHTML);
          //Help to add 0001 or other number at the ean of groupname START
          let course_id_
          for(let i = 0; i < courses.length; i++){
            if(courses[i].label === e.target.innerHTML){course_id_ = courses[i].id}} 
            getGroups(course_id_).then((data)=>{
            setCurrentGroupNumber(data.length+1)})
          //Help to add 0001 or other number at the ean of groupname END
        }}
        disablePortal
        id="combo-box-demo"
        options={courses}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Based on course..." />}
      />
    </div>
    <div>
      <div>Recommended name</div>
    <TextField id="outlined-basic"  variant="outlined" style={{marginTop:'8px'}} value={(coursesChosen?coursesChosen:'') + '_' + (currentGroupNumber?currentGroupNumber:'')}/>
    </div>
    <Button onClick={()=>{sendNewGroup()}} style={{height:'54px', marginTop:'28px', backgroundColor:'#D0D0F1', padding:"0px 40px"}}>Создать</Button>
      <ToastContainer autoClose={1500}/>
      </div>
    </div>
    <AdminCreateUser />
    <AdminChangeUser usersData={users}/>

{/* =================  CREATE NEW GROUP HTML END  ================= */}
    </div>
  );
  }else{
    return(
    <div className={css.teacher}>
      <HeaderTeacher data={myRole}/>
      <h1 style={{margin:'40px', color:'rgb(55, 84, 135)'}}>Checking your permissions...</h1>
    </div>)
  }
}






















{/* =================  CREATE NEW GROUP CSS START  ================= */}
const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 500px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 500px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);
{/* =================  CREATE NEW GROUP CSS END  ================= */}

