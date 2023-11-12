import css from './Table.module.css'
import Footer from '../Other/Footer'
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

function createData(name, mon, tue, wed, thu, fri, sat, sun) {
  return {name, mon, tue, wed, thu, fri, sat, sun};
}



// const rows = [
//   createData('React-01', '', '', '10:30-11:50', '', '', '', '10:30-11:50'),
//   createData('JavaScript-02', '', '', '', '', '', '', '10:30-13:20'),
//   createData('HTML-02', '16:00-17:20', '', '16:00-17:20', '', '16:00-17:20', '', ''),
//   createData('WebExpress-01', '', '16:00-17:20', '', '16:00-17:20', '', '16:00-17:20', ''),
//   createData('WebExpress-02', '10:30-11-20', '', '', '', '', '', ''),
// ];

// FOR TABLE //

export default function Tables () {

  const [table, setTable] = React.useState([])

  const rows = []
  debugger
  table?.map((el)=>{
    rows.push(createData(el.name, el.mon, el.tue, el.wed, el.thu, el.fri, el.sat, el.sun))
  })

  React.useEffect(()=>{
    getTable().then((data)=>{
      setTable(data.data.sort((a, b) => a.lesson_num - b.lesson_num)) // Сортируем по lesson_num, чтобы уроки начинающиеся в 9-00 были выше 18-00
    })
  }, [])

return(
  <div style={{backgroundColor:"rgb(241, 244, 247)", paddingBottom:'100px', minHeight:"calc(100vh - 100px)"}}>
    <HeaderLanding />
    <div style={{maxWidth:"1100px", margin:'50px auto'}}>
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
                {row.name}
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
  </div>
)
}