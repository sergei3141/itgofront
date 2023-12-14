import * as React from 'react';
import css from './Admin.module.css'
import { createNewCourse } from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast }from'react-toastify';import'react-toastify/dist/ReactToastify.css';

import { PROGRAMMS} from '../Landing/InfoBase';

export default function AdminCreateCourse(props) {

  const notifyError = () => toast.error("Что-то пошло не так!");
  const notifySucces = () => toast.success("Курс создан!");

  function sendNewCourse () {
    let obj = new FormData
    obj.append('name', document.getElementById('outlined-basic-createCourse').value)
    createNewCourse(obj).then((data)=>{
      if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}
    })
  }

  return(
    <div className={css.card}>
        <div style={{display:'flex', flexWrap:'wrap'}}><div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)', margin:'10px'}}><b>Создать новый курс</b></div></div>

        <TextField id="outlined-basic-createCourse" label="Course name" variant="outlined" style={{width:'80%'}} />
        <Button onClick={()=>{sendNewCourse()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", marginLeft:'30px'}}>Создать</Button>
        <ToastContainer autoClose={1500}/>
        <div style={{display:'flex', flexWrap:'wrap'}}><div style={{textAlign:'start', marginTop:'16px'}}>Название ОБЯЗАТЕЛЬНО ДОЛЖНО совпадать!!! На данный момент на главной странице имеются курсы:</div> {PROGRAMMS.map((el)=>{return(<div style={{marginLeft:'16px', marginTop:'16px'}}>{el.base}</div>)})}</div>
    </div>
  )
}