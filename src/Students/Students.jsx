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
import dayjs from 'dayjs';

import Header from '../Header/HeaderStudents'

import { authMe, getGroupByUserId, getLessonsByGroup, getUsersByGroup } from '../API/API';


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

  const [allTasks, setAllTasks] = React.useState(['','']);
  const [completedTasks, setCompletedTasks] = React.useState('');

  const handleChange = (event, newValue) => {   //TABS
    setValue(newValue);
  };

  const navigate = useNavigate();

  React.useEffect(()=>{
    authMe().then((authMeData)=>{
      if(authMeData.role==='teacher' || authMeData.role==='admin'){return navigate("/teacher")}
      setHeaderData(authMeData)
      setCompletedTasks(authMeData.tasks_completed)

      getGroupByUserId(authMeData.id).then((data_group)=>{
        setMyGroup(data_group)
        getLessonsByGroup(data_group?.data[0]?.id).then((lessons)=>{  //Пусть по дефолту будет группа первая по списку
          setMyLessons(lessons) //

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
              console.log(lessonH)
              let tasks = []
              lessonH.data.map((lesson)=>{
                tasks.push(lesson?.cw || 0)
                tasks.push(',')
                tasks.push(lesson?.hw || 0)
                tasks.push(',')
              })
              tasks = tasks.join('').split(',')
              const uniqueTasks = Array.from(new Set(tasks)); //оставляем только уникальные значения
              console.log(uniqueTasks)
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
    })
  }

  function composeAllTasks(){
    // getLessonsByGroup(data_group?.data[0]?.id).then((lessons)=>{  //Пусть по дефолту будет группа первая по списку
    //   debugger
    //   setMyLessons(lessons) //
    // });

  }

  return (
    <div className={css.students}>
      <Header propsHeaderData={headerData}/>
      <div style={{width: '80%', margin: '30px auto 30px auto'}}>
      <Box sx={{ width: 'calc(100% - 60px)', backgroundColor:'white'}} style={{marginBottom: '50px', padding:'30px'}}>
        Заданные 
        {allTasks?.sort(function(a, b) {return a - b})?.map((el)=>{return(<div key={el}>{el}</div>)})}
        Выполненные
        {completedTasks?.split(',')?.sort(function(a, b) {return a - b}).map(el=>{return(<div>{el}</div>)})}
        Разница
        {allTasks?.sort(function(a, b) {return a - b;}).filter(n => !completedTasks.includes(n)).map(el=>{return(<div>{el}</div>)})
        }
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
              </TableRow>
            </TableHead>
            <TableBody>
              {myLessons?.data?.map((row) => {
                
                return(<TableRow
                  key={Math.random()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{}</TableCell>
                  <TableCell >{row.created_at?.slice(0,10).split('-').reverse().join('.')}</TableCell>
                  <TableCell >{row.theme}</TableCell>
                  <TableCell align='center'>{
                  row.marks.split(',')[markPlace] == -1 ? 'Студент отсутствовал' : row.marks.split(',')[markPlace]
                  }</TableCell>
                  <TableCell >{row.cw + "," + row.hw}</TableCell>
                </TableRow>
)})}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}