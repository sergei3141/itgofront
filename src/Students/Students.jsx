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

const dataBase = {
  'students' : {
    'Alisher112' : {
      'name' : 'Alisher Abror Hojaevich',
      'password' : '12345',
      'homework': [2, 4, 7, 8, 15, 3, 5],
      'courses' : {
        'JSFULL':{
          'group' : '01-JSFULL',
          'mark': [5, 5, 4],
        }, 
        'C++':{
          'group' : '03-C++',
          'mark': [5, 3, 3],
        }, 
        'PHP':{
          'group' : '13-PHP',
          'mark': [3, 5, 4],
        }}
    },
    'Boris_F' : {
      'name' : 'Boris Fedorovich',
      'password' : 'qwerty1Q',
      'courses' : {}
    },
    'Celestia_Eq' : {
      'name' : 'Princess Celestia',
      'password' : '11235813',
      'courses' : {}
    }
  },

  'groups':{
    '01-JSFULL' : {
      'main' : 'JSFULL',
      'active': true,
      'lessonsTable': [{'time': '10:20', 'day': 'Saturday'}, {'time': '12:20', 'day': 'Monday'}],
      'lessonsLog': [new Date(), new Date(), new Date()],
      'students': [
        'Alisher112', 'Boris_f'
      ]
    },
    '03-C++' : {
      'main' : 'C++',
      'active': true,
      'lessonsTable': [{'time': '10:20', 'day': 'Saturday'}, {'time': '12:20', 'day': 'Monday'}],
      'lessonsLog': [new Date(), new Date(), new Date()],
    },
    '13-PHP' : {
      'main' : 'PHP',
      'active': true,
      'lessonsTable': [{'time': '10:20', 'day': 'Saturday'}, {'time': '12:20', 'day': 'Monday'}],
      'lessonsLog': [new Date(), new Date(), new Date()],
    },
  },

  'themes':{
    'JSFULL':{'long': 15,
              'lessons': [
                {'name': 'Введение', 'homework': [3, 4, 5]},
                {'name': 'HTML', 'homework': [7, 9, 10]},
                {'name': 'CSS', 'homework': [11, 12, 15]}]
              },
    
    'C++':[{'name': 'Введение', 'homework': [1, 2, 5]},
           {'name': 'Функции', 'homework': [6, 7, 8]},
    ],
  }
}




export default function BasicTable() {

  const [value, setValue] = React.useState(0);  //TABS
  const [headerData, setHeaderData] = React.useState();
  const [myGroup, setMyGroup] = React.useState();
  const [myLessons, setMyLessons] = React.useState();
  const [markPlace, setMarkPlace] = React.useState();

  const handleChange = (event, newValue) => {   //TABS
    setValue(newValue);
  };

  const navigate = useNavigate();

  React.useEffect(()=>{
    authMe().then((authMeData)=>{
      if(authMeData.role==='teacher' || authMeData.role==='admin'){return navigate("/teacher")}
      setHeaderData(authMeData)
      getGroupByUserId(authMeData.id).then((data_group)=>{
        setMyGroup(data_group)
        getLessonsByGroup(data_group?.data[0]?.id).then((lessons)=>{  //Пусть по дефолту будет группа первая по списку
          setMyLessons(lessons)
        });
        getUsersByGroup(data_group?.data[0]?.id).then((data_users)=>{
          console.log(data_users)
          for(let i = 0; i < data_users?.data.length; i++){
            if (data_users.data[i].name === authMeData.name){setMarkPlace(i)}
          }
        })
      })
  })

  //Узнаем список людей в группе, чтобы правильно выдать оценку




  }, [])

  function getMyLessons (group_id) {
    debugger
    getLessonsByGroup(group_id).then((lessons)=>{
      setMyLessons(lessons)
      console.log(lessons)
    })
  }

  const rows = []

  function createRowsArray (login, course){
    let group = dataBase.students[login].courses[course].group
    for (let i = 0; i < myLessons?.data.length; i++){
      rows.push(createData(myLessons?.data[i].lesson_num, 
                            myLessons?.data[i].created_at.slice(0,10),
                            myLessons?.data[i].theme, 
                            myLessons?.data[i].marks.split(',')[markPlace],
                            myLessons?.data[i].hw)
                            )
    }
  }
  
  createRowsArray('Alisher112', 'JSFULL')

  function createData(number, date, theme, mark, homework) {
    return { number, date, theme, mark, homework };
  }

  return (
    <div className={css.students}>
      <Header propsHeaderData={headerData}/>
      <div style={{width: '80%', margin: '30px auto 30px auto'}}>
        <Box sx={{ width: '100%', backgroundColor:'white'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {myGroup?.data.map((el)=>{
                return(<Tab label={el.name} {...a11yProps(0)} onClick={()=>{getMyLessons(el.id)}} />)})}
              
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
              {rows.map((row) => (
                <TableRow
                  key={Math.random()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.number}</TableCell>
                  <TableCell >{row.date}</TableCell>
                  <TableCell >{row.theme}</TableCell>
                  <TableCell align='center'>{row.mark}</TableCell>
                  <TableCell >{row.homework}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}