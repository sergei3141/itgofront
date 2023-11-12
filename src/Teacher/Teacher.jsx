import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dayjs from 'dayjs';
import { pink, green, yellow } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';


import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';


import { Icon } from '@iconify/react';
import { Header } from 'antd/es/layout/layout';
import { authMe, getAllGroups, getGroups, getLessonsByGroup, getGroupsById, getThemesByCoursesId, getUsersByGroup, createNewLesson } from '../API/API';
import css from './Teacher.module.css'

import HeaderTeacher from '../Header/HeaderTeacher'


const dateFormatList = ['DD.MM.YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const onChangeCalendar = (date, dateString) => {
};

function CustomTabPanel(props) {  //TABS
  const { children, value, index, ...other } = props;
  return (
    <div >
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
}

function createData(id, course_id, theme, cw, hw, pptx, docx, lesson_num, type, created_at, studentsAndMarks) {
  return {
    id, 
    course_id,
    theme,
    cw,
    hw,
    pptx, 
    docx,
    lesson_num,
    type,
    created_at,
    studentsAndMarks
  };
}

function StudentsMark(mark, name){

  const [age, setAge] = React.useState(mark);

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return(
    <FormControl style={{width:"90px"}} size="small">
    <InputLabel id="demo-simple-select-label">Балл</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id={name.replace(/[^a-zA-Z]+/g, '')}
      value={age}
      label="Mark"
      onChange={handleChange}
      defaultValue={-1}
    > <MenuItem value={-1}>-1</MenuItem>
      <MenuItem value={0}>0</MenuItem>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={5}>5</MenuItem>
    </Select>
  </FormControl>
  )
}

function CommentForStudent(){

  const [comment, setComment] = React.useState('');

  return(
    <TextField
    hiddenLabel
    id="filled-hidden-label-small"
    defaultValue=""
    variant="filled"
    size="small"
  />
  )
}

function Row(props) {
  const { row } = props;

  const [open, setOpen] = React.useState(false);

  function sendToServer () {
    // console.log(props.currentGroupId)
    // console.log(props.currentGroupName.split("_")[0])
    // console.log(props.currentGroupName)
    // console.log(props.r.lesson_num)
    // console.log(props.r.theme)
    // console.log(props.r.cw)
    // console.log(props.r.hw)

    let arr = []
    props.r.studentsAndMarks.map((el)=>{
      arr.push(+document.getElementById(el.student.name.replace(/[^a-zA-Z]+/g, '')).innerText)
    })
    let marks = arr.join(',')

    let obj = new FormData()
    obj.append('group_id', +props.currentGroupId)
    obj.append('base', props.currentGroupName.split("_")[0])
    obj.append('group', props.currentGroupName)
    if(props.r.lesson_num){obj.append('lesson_num', props.r.lesson_num)}
    obj.append('theme', props.r.theme)
    obj.append('cw', props.r.cw)
    obj.append('hw', props.r.hw)
    obj.append('marks', marks)
    const notifySucces = () => toast.success("Урок успешно проведён!");
    createNewLesson(obj).then(()=>{
      notifySucces()
      window.location.reload()
    })

  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={props.r.type === "past" ? {backgroundColor:'#e4fce3'} : {}}>
        <TableCell style={{width:'40px'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.r.theme}
        </TableCell>
        <TableCell align="right">
          {props.r.type === "future" ? <div>Урок запланирован </div> : <div>Урок состоялся </div>}   
          {}        
          <DatePicker onChange={onChangeCalendar} defaultValue={dayjs(props.r.created_at?.slice(0,10).split('-').reverse().join('.'), dateFormatList[0])} format={dateFormatList} disabled={true}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className={css.underTable}> 
              <div style={{margin:'auto 10px', width:'4vw'}}>
                <div style={{fontSize:'32px', cursor:'pointer'}}><Icon icon="vaadin:presentation" /></div>
                <div style={{fontSize:'32px', cursor:'pointer'}}><Icon icon="teenyicons:doc-outline" /></div>
                </div>
                <div  style={{width:'calc(45vw - 20% + 20px)'}}>
                  <div style={{marginLeft:"15px"}}>Задания в классе:</div>
                  <div className={css.tasks}>
                    {props.r.cw.split(',').map((el)=>{return(<div>{el}</div>)})}
                  </div>
                </div>
                <div  style={{width:'calc(45vw - 20% + 20px)'}}>
                  <div style={{marginLeft:"15px"}}>Задания на дом:</div>
                  <div className={css.tasks}>
                  {props.r.hw.split(',').map((el)=>{return(<div>{el}</div>)})}
                  </div>
                </div>
              </div>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Студент</TableCell>
                    <TableCell align="center">Присутствие и оценка</TableCell>
                    <TableCell align="center">Комментарий</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.r.studentsAndMarks.map((markAndStudent) => (
                    <TableRow>
                      <TableCell component="th" scope="row" >
                        {markAndStudent.student.name}
                      </TableCell>
                      {/* <TableCell style={{width:'130px'}}>
                        {RadioGroup()}
                      </TableCell> */}
                      <TableCell align="center" >{StudentsMark(markAndStudent.mark, markAndStudent.student.name)}</TableCell>
                      <TableCell align="center">
                      {CommentForStudent()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
                    {props.r.type === 'past' 
                    ?<Button className={css.lessonEnd} style={{backgroundColor:'#f0d5d5', margin:"20px 0px 60px 0px"}} disabled={true}>УРОК УЖЕ ЗАВЕРШЁН</Button>
                    :<Button className={css.lessonEnd} style={{backgroundColor:'#bee4fa', margin:"20px 0px 60px 0px"}} onClick={()=>{sendToServer()}}>ЗАВЕРШИТЬ УРОК</Button>
                    }
            <ToastContainer autoClose={1500}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {

  const [value, setValue] = React.useState(-1);  //TABS
  const [myRole, setMyRole] = React.useState()
  const [allGroups, setAllGroups] = React.useState()

  const[courses, setCourses] = React.useState();
  const[lessons, setLessons] = React.useState()
  const[students, setStudents] = React.useState()
  const[compose, setCompose] = React.useState()


  //FOR SEND TO SERVER
  const[currentGroupId, setCurrentGroupId] = React.useState()
  const[currentGroupName, setCurrentGroupName] = React.useState()

  const rows2 = []
  const rows = compose?.map((el)=>{
    rows2.push(createData(el.id, el.course_id, el.theme, el.cw, el.hw, el.pptx, el.docx, el.marks, el.type, el.created_at, el.studentsAndMarks))
  })

  const handleChange = (event, newValue) => {   //TABS

    let lessonsCurrent
    let studentsCurrent
    let coursesCurrent

    setValue(newValue);
    getLessonsByGroup(allGroups[newValue].id).then((data)=>{
      setLessons(data.data)
      lessonsCurrent = data.data
    getGroupsById(allGroups[newValue].id).then((data2)=>{
      setCurrentGroupName(data2.name)
      getUsersByGroup(allGroups[newValue].id).then((data3)=>{
        setCurrentGroupId(allGroups[newValue].id)
        setStudents(data3.data)
        studentsCurrent = data3.data
        getThemesByCoursesId(data2.course_id).then((data4)=>{
          setCourses(data4.data)
          coursesCurrent = data4.data
          composeData(lessonsCurrent, studentsCurrent, coursesCurrent)
        })
      })
    })
    }) 
  };

  function composeData (lessonsCurrent, studentsCurrent, coursesCurrent) {
    let lessonsAndCourses = []

    for (let i = 0; i < coursesCurrent?.length; i++){
      let arr = []
      let obj = {};
      obj.id = i
      obj.pptx = coursesCurrent[i].pptx;
      obj.docx = coursesCurrent[i].docx;
      obj.hw = lessonsCurrent[i]?.hw || coursesCurrent[i].hw
      obj.cw = lessonsCurrent[i]?.cw || coursesCurrent[i].cw
      obj.theme = coursesCurrent[i].theme 
      let marks = lessonsCurrent[i]?.marks?.split(',') || []
      for(let j = 0; j < studentsCurrent.length; j++){
        arr.push({'mark': marks[j], 'student': studentsCurrent[j]})
      }
      obj.studentsAndMarks = arr
        if(lessonsCurrent[i]?.marks){
          obj.type = 'past'
          obj.created_at = lessonsCurrent[i].created_at
        }else{
          obj.type = 'future'
        }
      lessonsAndCourses.push(obj)
    }
    setCompose(lessonsAndCourses)
  }





  CustomTabPanel.propTypes = {  //TABS
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  

  function a11yProps(index) {   //TABS
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  React.useEffect(()=>{
    authMe().then((data)=>{
      setMyRole(data.role)
    })

    getAllGroups().then((data)=>{
      setAllGroups(data)
    })


  }, [])

  function getGroupsFunction (id) {
    getGroups(id).then((data)=>{
    })
  }

  if(myRole == 'admin' || myRole == 'teacher'){
  return (
    <div className={css.teacher}>
            <HeaderTeacher data={myRole}/>
            <div style={{width: '90%', margin: '30px auto 30px auto'}}>

    <TableContainer component={Paper} style={{width: '90%', margin: '30px auto 30px auto'}}>
    <Box sx={{backgroundColor:'white'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="scrollable" id="tableHeader">
              {allGroups?.map((el)=>{return(
                <Tab label={el.name} {...a11yProps(el.id)} />
              )})}
            </Tabs>
          </Box>

        </Box>
      <Table aria-label="collapsible table">
        <TableBody>
          {rows2?.map((row) => {return(
            <Row key={row.id + row.created_at + row.theme} r={row} currentGroupId={currentGroupId} currentGroupName={currentGroupName}/>
          )}
          )}
          {!rows2[0] ? <div style={{height:"400px"}}><h3>Choose your group to start</h3></div> : <div></div>}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
  }else{
    return(<div className={css.teacher}>
            <HeaderTeacher data={myRole}/>
             <h1 style={{margin:'40px', color:'rgb(55, 84, 135)'}}>Checking your permissions...</h1>
          </div>)
  }
}