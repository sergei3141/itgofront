import css from './Admin.module.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { getThemesByCoursesId, deleteThemeById, changeThemeById, createNewTheme } from '../API/API';
import { Icon } from '@iconify/react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';

export default function AdminThemesTable (props) {

  const notifyError = () => toast.error("Что-то пошло не так");
  const notifySucces = () => toast.success("Изменения внесены!");

  const [courseId, setCourseId] = React.useState(0)
  const [themes, setThemes] = React.useState(0)
  const [table, setTable] = React.useState([])

  function getThemes () {
    setTimeout(()=>{
      let id = document.getElementById('courseManage').value.split(',')[0].replace(/[^+\d]/g, '')
      setCourseId(id)
      getThemesByCoursesId(id).then((data)=>{

        let sorted = data?.data?.sort(function(a,b){ 
          let x = a.lesson_num < b.lesson_num? -1:1; 
          return x; 
      });
        setThemes(sorted)
        let rows = []
        for (let i = 0; i < data.data.length; i++){
          rows.push(createData(data.data[i].id, data.data[i].lesson_num, data.data[i].theme, data.data[i].hw, data.data[i].cw, data.data[i].pptx, data.data[i].docx))
        }
        setTable(rows)
      })
    },0)
  }

  function changeTable (id) {
    let obj = new FormData
    obj.append('lesson_num', document.getElementById(`table_lesson_num${id}`).value)
    obj.append('theme', document.getElementById(`table_theme${id}`).value)
    obj.append('hw', document.getElementById(`table_hw${id}`).value)
    obj.append('cw', document.getElementById(`table_cw${id}`).value)
    obj.append('pptx', document.getElementById(`table_docx${id}`).value)
    obj.append('docx', document.getElementById(`table_pptx${id}`).value)
    obj.append('project', document.getElementById(`table_project${id}`).value)

    changeThemeById(id, obj).then((data)=>{
      if(data.status = 200){notifySucces()}else{notifyError()}
    })
  }

  function createNewTable () {
    let obj = new FormData
    obj.append('lesson_num', '')
    obj.append('theme', '')
    obj.append('hw', '')
    obj.append('cw', '')
    obj.append('docx', '')
    obj.append('pptx', '')
    obj.append('project', '')
    obj.append('course_id', courseId)

  createNewTheme(obj).then((data)=>{
    getThemes()
  })
  }


  function createData(id, lesson_num, theme, hw, cw, pptx, docx, project) {
    return { id, lesson_num, theme, hw, cw, pptx, docx, project };
  }


  const defaultProps = {
    options: props.courses,
    getOptionLabel: (option) => `id:${option.id}, ${option.label}`,
  }

  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)'}}><b>Управление темами курсов (сначала выберите курс!)</b></div>
      <Autocomplete
        style={{width:'100%'}}
        {...defaultProps}
        disablePortal
        id="courseManage"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Выберите курс, чтобы начать его редактирование" />}
        onChange={()=>{getThemes()}}
      />

    <TableContainer component={Paper} style={{marginTop:'20px'}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>id</StyledTableCell>
                <StyledTableCell align="left">№</StyledTableCell>
                <StyledTableCell align="left">theme</StyledTableCell>
                <StyledTableCell align="left">CW</StyledTableCell>
                <StyledTableCell align="left">HW</StyledTableCell>
                <StyledTableCell align="left">docx</StyledTableCell>
                <StyledTableCell align="left">pptx</StyledTableCell>
                <StyledTableCell align="left">project</StyledTableCell>
                <StyledTableCell align="left">sub</StyledTableCell>
                <StyledTableCell align="left">del</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((row) => (
                <StyledTableRow key={row.id} id={`tab2${row.id}`}>
                  <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'40px'}}defaultValue={row.lesson_num} id={`table_lesson_num${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'145px'}}defaultValue={row.theme} id={`table_theme${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'145px'}}defaultValue={row.cw} id={`table_cw${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'145px'}}defaultValue={row.hw} id={`table_hw${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'140px'}}defaultValue={row.pptx} id={`table_pptx${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'140px'}}defaultValue={row.docx} id={`table_docx${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><input style={{width:'140px'}}defaultValue={row.docx} id={`table_project${row.id}`}></input></StyledTableCell>
                  <StyledTableCell align="left"><Icon icon="ei:check" style={{cursor:'pointer', fontSize:'24px'}} onClick={()=>{changeTable(row.id)}}/></StyledTableCell>           
                <StyledTableCell align="left"><Icon icon="ph:trash" style={{cursor:'pointer', fontSize:'24px'}} onClick={()=>{deleteThemeById(row.id);document.getElementById(`tab2${row.id}`).remove()}}/></StyledTableCell> 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={()=>{createNewTable()}}>+</button>
        <ToastContainer autoClose={1500}/>
    </div>
  )
}



// ===== STYLES ===== //

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