import css from './Table.module.css'
import Footer from '../Other/Footer'
import Header from '../Header/HeaderLanding';
import Map from '../Other/Map'
import HeaderLanding from '../Header/HeaderLanding'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getTable } from '../API/API';

import pic11 from '../img/photo/photo12.jpg'
import { Programms } from '../Landing/Landing';

// FOR TABLE //

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, mon, tue, wed, thu, fri, sat, sun, open) {
  return {name, mon, tue, wed, thu, fri, sat, sun, open};
}

// FOR TABLE //

export default function Tables () {
  window.scroll(0,0);
  const [table, setTable] = React.useState([])

  const rows = []
  table?.map((el)=>{
    rows.push(createData(el.name,el.mon, el.tue, el.wed, el.thu, el.fri, el.sat, el.sun,  el.open, ))
  })

  React.useEffect(()=>{
    getTable().then((data)=>{
      setTable(data.data.sort((a, b) => a.lesson_num - b.lesson_num)) // Сортируем по lesson_num, чтобы уроки начинающиеся в 9-00 были выше 18-00
    })
  }, [])

return(
  <div style={{backgroundColor:"rgb(241, 244, 247)", minHeight:"calc(100vh - 100px)"}}>
        <div className={css.head_setting} >
          <Header />
        </div>
    <div className={css.table}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Группа</StyledTableCell>
            <StyledTableCell align="center">Понедельник</StyledTableCell>
            <StyledTableCell align="center">Вторник</StyledTableCell>
            <StyledTableCell align="center">Среда</StyledTableCell>
            <StyledTableCell align="center">Четверг</StyledTableCell>
            <StyledTableCell align="center">Пятница</StyledTableCell>
            <StyledTableCell align="center">Суббота</StyledTableCell>
            <StyledTableCell align="center">Воскресенье</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <div className={css.name_title}>{row.name}</div>
                {row.open ? <div className={css.splash}>{row.open}</div> : <div></div>}
              </StyledTableCell>
              <StyledTableCell align="center">{row.mon}</StyledTableCell>
              <StyledTableCell align="center">{row.tue}</StyledTableCell>
              <StyledTableCell align="center">{row.wed}</StyledTableCell>
              <StyledTableCell align="center">{row.thu}</StyledTableCell>
              <StyledTableCell align="center">{row.fri}</StyledTableCell>
              <StyledTableCell align="center">{row.sat}</StyledTableCell>
              <StyledTableCell align="center">{row.sun}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    <h1>Чему вас научит выбранный курс:</h1>

    <Programms />

    <div style={{backgroundImage:`url(${pic11})`, backgroundSize:"cover", paddingTop:'1px', backgroundPosition:'center', marginTop:'80px'}}>
      <Map />
      <Footer/>
    </div>
  </div>
)
}