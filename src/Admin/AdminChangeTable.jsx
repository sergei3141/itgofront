
import * as React from 'react';
import css from './Admin.module.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTable, getTable, deleteTableById, changeTableById } from '../API/API';
import { Icon } from '@iconify/react';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';
import { getAllCourses } from '../API/API';

function AdminChangeTable () {

  const [courses, setCourses] = React.useState([])
  const [table, setTable] = React.useState([])


  function createData(id, lesson_num, name, mon, tue, wed, thu, fri, sat, sun, open, base) {
    return { id, lesson_num, name, mon, tue, wed, thu, fri, sat, sun, open, base };
  }

  const notifyError = () => toast.error("Ошибка");
  const notifySucces = () => toast.success("Изменения внесены!");

  function createNewTable () { 
    let obj = new FormData
    obj.append('name', '')
    obj.append('lesson_num', '')
    obj.append('mon', '')
    obj.append('tue', '')
    obj.append('wed', '')
    obj.append('thu', '')
    obj.append('fri', '')
    obj.append('sat', '')
    obj.append('sun', '')
    obj.append('open', '')
    obj.append('base', '')

    createTable(obj).then(()=>{
      getTable().then((data)=>{
        for (let i = 0; i < data.data.length; i++){
          rows.push(createData(data.data[i].id, data.data[i].lesson_num, data.data[i].name, data.data[i].mon, data.data[i].tue, data.data[i].wed, data.data[i].thu, data.data[i].fri, data.data[i].sat, data.data[i].sun, data.data[i].open, data.data[i].base))
        }
        setTable(rows)
      })
  })}

  function changeTable (id) {
    let obj = new FormData
    obj.append('base', document.getElementById(`${id}.base`).value || "")
    obj.append('name', document.getElementById(`${id}.1`).value || "")
    obj.append('lesson_num', document.getElementById(`${id}.0`).value || "")
    obj.append('open',  document.getElementById(`${id}.9`).value || "")
    obj.append('mon', document.getElementById(`${id}.2`).value || "")
    obj.append('tue', document.getElementById(`${id}.3`).value || "")
    obj.append('wed', document.getElementById(`${id}.4`).value || "")
    obj.append('thu', document.getElementById(`${id}.5`).value || "")
    obj.append('fri', document.getElementById(`${id}.6`).value || "")
    obj.append('sat', document.getElementById(`${id}.7`).value || "")
    obj.append('sun', document.getElementById(`${id}.8`).value || "")

    changeTableById(id, obj).then((data)=>{
      if(data.data.status = 200){notifySucces()}else{notifyError()}
    })
  }


  const rows = []

  React.useEffect(()=>{

    getAllCourses().then((data)=>{
      data.data = data.data.map((el)=>{return{
        label: el.name,
        id: el.id
      }})
      setCourses(data.data)
    })

    getTable().then((data)=>{
      for (let i = 0; i < data.data.length; i++){
        rows.push(createData(data.data[i].id, data.data[i].lesson_num, data.data[i].name, data.data[i].mon, data.data[i].tue, data.data[i].wed, data.data[i].thu, data.data[i].fri, data.data[i].sat, data.data[i].sun, data.data[i].open, data.data[i].base))
      }
      setTable(rows)
    })

  },[])

  return (
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)',}}><b>Изменить расписаие</b></div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" >ID</StyledTableCell>
              <StyledTableCell align="left">№</StyledTableCell>
              <StyledTableCell align="left">Base</StyledTableCell>
              <StyledTableCell align="left">Название группы</StyledTableCell>
              <StyledTableCell align="left">Пн</StyledTableCell>
              <StyledTableCell align="left">Вт</StyledTableCell>
              <StyledTableCell align="left">Ср</StyledTableCell>
              <StyledTableCell align="left">Чт</StyledTableCell>
              <StyledTableCell align="left">Пт</StyledTableCell>
              <StyledTableCell align="left">Сб</StyledTableCell>
              <StyledTableCell align="left">Вс</StyledTableCell>
              <StyledTableCell align="left">Open</StyledTableCell>
              <StyledTableCell align="left">Sub</StyledTableCell>
              <StyledTableCell align="left">Del</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            table.map((row) => {
              return(
              <StyledTableRow key={row.id} id={`tab${row.id}`}>
                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.0'}`} style={{width:'25px'}} defaultValue={row.lesson_num}></input></StyledTableCell>
                <StyledTableCell align="left"><select id={`${row.id + '.base'}`} value={row.base} onChange={(e)=>{let a = e.nativeEvent.target.value; setTimeout(()=>{document.getElementById(`${row.id}.base`).value = a},10)}}>{courses.map((el)=>{return(<option value={el.label} ><div>{el.label}</div></option>)})}</select></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.1'}`} defaultValue={row.name}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.2'}`} defaultValue={row.mon}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.3'}`} defaultValue={row.tue}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.4'}`} defaultValue={row.wed}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.5'}`} defaultValue={row.thu}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.6'}`} defaultValue={row.fri}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.7'}`} defaultValue={row.sat}></input></StyledTableCell>
                <StyledTableCell align="left"><input id={`${row.id + '.8'}`} defaultValue={row.sun}></input></StyledTableCell>   
                <StyledTableCell align="left"><input id={`${row.id + '.9'}`} defaultValue={row.open} style={{width:'170px'}}></input></StyledTableCell>  
                <StyledTableCell align="left"><Icon icon="ei:check" style={{cursor:'pointer', fontSize:'24px'}} onClick={()=>{changeTable(row.id)}}/></StyledTableCell>           
                <StyledTableCell align="left"><Icon icon="ph:trash" style={{cursor:'pointer', fontSize:'24px'}} onClick={()=>{deleteTableById(row.id);document.getElementById(`tab${row.id}`).remove()}}/></StyledTableCell> 
                </StyledTableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer autoClose={1500}/>
      <button onClick={()=>{createNewTable()}}>+</button>
    </div>
  )
}

export default AdminChangeTable;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: 0,
    padding: '3px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
    padding: '10px 5px'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    border: 0,
    padding: '3px'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    padding: '3px'
  },
}));

