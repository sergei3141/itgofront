import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import css from './Students.module.css'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

import Header from '../Header/HeaderStudents'

import { authMe, getGroupByUserId, getLessonsByGroup, getUsersByGroup } from '../API/API';

let lessomNum = 0

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

export default function BasicTable() {

  const [value, setValue] = React.useState(0);  //TABS
  const [headerData, setHeaderData] = React.useState();
  const [myGroup, setMyGroup] = React.useState();
  const [myLessons, setMyLessons] = React.useState(['','']);
  const [markPlace, setMarkPlace] = React.useState();
  const [balance, setBalance] = React.useState(0);

  const [allTasks, setAllTasks] = React.useState(['','']);
  const [completedTasks, setCompletedTasks] = React.useState('');

  const handleChange = (event, newValue) => {   //TABS
    setValue(newValue);
  };

  const navigate = useNavigate();

  React.useEffect(()=>{
    authMe().then((authMeData)=>{
      if(authMeData.role==='teacher' || authMeData.role==='admin'){return navigate("/teacher")}  // REDIRECT FOR STUFF ONLY
      setHeaderData(authMeData)

      setBalance(Math.ceil(authMeData.balance))
      setCompletedTasks(authMeData.tasks_completed)

      getGroupByUserId(authMeData.id).then((data_group)=>{
        setMyGroup(data_group)
        getLessonsByGroup(data_group?.data[0]?.id).then((lessons)=>{  //Пусть по дефолту будет группа первая по списку
          setMyLessons(lessons) //
          lessomNum = 0;

// Здесь мы смотрим в каких группах состоит ученик и собираем задания по группам. НАЧАЛО

          if(data_group?.data.length > 1){//Здесь должно быть 1, 2 это заглушка для разработки
          }else{
            let tasks = []
            lessons.data.map((lesson)=>{
              tasks.push(lesson?.cw || 0)
              tasks.push(',')
              tasks.push(lesson?.hw || 0)
              tasks.push(',')
            })
            tasks = tasks.join('').split(',')
            const uniqueTasks = Array.from(new Set(tasks)); //оставляем только уникальные значения
            setAllTasks(uniqueTasks)
          }
          let tasksFromAllGroups = []

           for (let i = 0; i < data_group.data.length; i++){

            getLessonsByGroup(data_group?.data[i]?.id).then((lessonH)=>{
              let tasks = []
              lessonH.data.map((lesson)=>{
                tasks.push(lesson?.cw || 0)
                tasks.push(',')
                tasks.push(lesson?.hw || 0)
                tasks.push(',')
              })
              tasks = tasks.join('').split(',')
              const uniqueTasks = Array.from(new Set(tasks)); //оставляем только уникальные значения
              tasksFromAllGroups = [].concat(uniqueTasks, tasksFromAllGroups)
              let tasksFromAllGroups2 = Array.from(new Set(tasksFromAllGroups))
              setAllTasks(tasksFromAllGroups2)
              })
           }
// Здесь мы смотрим в каких группах состоит ученик и собираем задания по группам. КОНЕЦ 
        });



//Узнаем список людей в группе, чтобы правильно выдать оценку
        getUsersByGroup(data_group?.data[0]?.id).then((data_users)=>{
          for(let i = 0; i < data_users?.data.length; i++){
            if (data_users.data[i].name === authMeData.name){setMarkPlace(i)}  
          }
        })
      })
  })
}, [])

  function getMyLessons (group_id) {
    getLessonsByGroup(group_id).then((lessons)=>{
      setMyLessons(lessons)
      lessomNum = 0
    })
  }

  return (
    <div className={css.students}>
      <Header propsHeaderData={headerData}/>
      <div style={{width: '80%', margin: '30px auto 30px auto'}}>
      <Box sx={{ width: 'calc(100% - 60px)', backgroundColor:'white'}} style={{marginBottom: '50px', padding:'30px'}}>
        <div style={{textAlign: 'start'}}>
          <div style={{display:'flex', margin:'20px', fontSize:'24px'}}>
            <div>{headerData?.name}</div>
            <div style={{paddingTop:'5px'}}>{headerData?.active == 1 ? <div  className={css.studentActive} title="Ваша учётная запись активна"><Icon icon="lets-icons:check-fill" color="green"/></div> : <Icon icon="material-symbols:error" color="red" className={css.studentActive} title="Ваша учётная запись приостоновлена, но вы всё ещё можете пользоваться CodeWings"/>}</div>
            <div style={{marginLeft:'auto', display:'flex'}}><div style={{color: 'gray', marginRight:'10px'}}>Телефон\логин: </div> {headerData?.phone}</div>
          </div>
        {/* <div style={{textAlign:'center'}}>Студент состоит в группах: 
        <div className={css.tasks__table}>
        {myGroup?.data.map((group)=>{
          return(<div key={group.name} className={css.tasks__cell} style={{width:'auto'}}>{group.name}</div>)})}
  </div>
  </div> */}
  </div>
        Тесты на дом:
        <div className={css.tasks__table}>
        {allTasks?.sort(function(a, b) {return a - b})?.map((el)=>{if(el !== "")return(<NavLink to="/codewings" state={{from: {el}}}><div key={el} className={css.tasks__cell}>{el}</div></NavLink>)})}
        </div>
        Выполненные тесты:
        <div className={css.tasks__table}>
        {completedTasks?.split(',')?.sort(function(a, b) {return a - b}).map(el=>{return(<NavLink to="/codewings" state={{from: {el}}}><div className={css.tasks__cell}>{el}</div></NavLink>)})}
        </div>
        Осталось выполнить:
        <div className={css.tasks__table}>
        {completedTasks ?
        (allTasks?.sort(function(a, b) {return a - b;}).filter((n) => {return !completedTasks.split(',').includes(n)}).map(el=>{return(<NavLink to="/codewings" state={{from: {el}}}><div>{el !== "" ? <div className={css.tasks__cell}>{el}</div>:<div></div> }</div></NavLink>)})) : <div></div>}
        </div>
      </Box>
        <Box sx={{ width: '100%', backgroundColor:'white'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {myGroup?.data.map((el)=>{
                return(<Tab label={el.name} {...a11yProps(0)} key={Math.random()} onClick={()=>{getMyLessons(el.id)}} />)})}
              
            </Tabs>
          </Box>

        </Box>
      {/*  TABLE  */}
        <TableContainer component={Paper} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>№</b></TableCell>
                <TableCell ><b>Дата занятия</b></TableCell>
                <TableCell ><b>Тема занятия</b></TableCell>
                <TableCell align='center'><b>Баллы</b></TableCell>
                <TableCell ><b>Задания</b></TableCell>
                <TableCell align='right'><b>Материалы</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <div style={{display:'none'}}>{lessomNum = 0}</div>
              {myLessons?.data?.map((row) => {
                lessomNum++
                return(<TableRow
                  key={Math.random()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{lessomNum}</TableCell>
                  <TableCell >{row.created_at?.slice(0,10).split('-').reverse().join('.')}</TableCell>
                  <TableCell >{row.theme}</TableCell>
                  <TableCell align='center'>{
                  row.marks.split(',')[markPlace] == -1 ? 'Студент отсутствовал' : row.marks.split(',')[markPlace]
                  }</TableCell>
                  <TableCell >{(row.cw? row.cw + "," : "") + (row.hw? row.hw + "," : "") + (row.comments? row.comments : "")}</TableCell>
                  <TableCell align='right' style={{width:'0px'}}>

                    <div style={{fontSize:'24px', cursor:'pointer', width:'50px'}}>
                  {row.pptx ? <a  target="_blank" href={row.pptx}><Icon icon="vaadin:presentation" /></a> : <Icon icon="vaadin:presentation" color="#999" style={{cursor:'no-drop'}} />}
                </div> 
                    </TableCell>
                </TableRow>
)})}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ width: 'calc(100% - 60px)', backgroundColor:'white'}} style={{marginTop:'50px', padding:'30px', display:'flex', justifyContent:'space-between'}}>
          <div>Баланс (актуально только для занятий в группе!): </div>
          {balance >= 0 ? <div style={{color:'green'}}><b>{new Intl.NumberFormat('ru-RU').format(balance || 0)} UZS</b></div> : <div style={{color:'red'}}><b>{new Intl.NumberFormat('ru-RU').format(balance || 0)} UZS</b></div>}
        </Box>
      </div>

    </div>
  );
}