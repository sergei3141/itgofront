import * as React from 'react';
import css from './Admin.module.css'
import { createNewStudent } from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';

export default function AdminCreateUser() {

  const notifyError = () => toast.error("Заполните все поля!");
  const notifySucces = () => toast.success("Студент создан!");

  function sendNewStudent () {
    let obj = new FormData()
    debugger
    obj.append('name', document.getElementById('outlined-basic-name').value)
    obj.append('phone', document.getElementById('outlined-basic-phone').value)
    obj.append('email', document.getElementById('outlined-basic-mail').value)
    obj.append('password', document.getElementById('outlined-basic-password').value)
    obj.append('reset', document.getElementById('outlined-basic-password').value)

    if(obj.get('name') && obj.get('phone') && obj.get('password')){
      createNewStudent(obj).then((data)=>{
        if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}
      })
    }else{
      notifyError()
    }
  }

  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)'}}><b>Создать студента</b></div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <TextField id="outlined-basic-name" label="Full Name*" variant="outlined" />
        <TextField id="outlined-basic-phone" label="Phone*" variant="outlined" />
        <TextField id="outlined-basic-mail" label="Mail" variant="outlined" />
        <TextField id="outlined-basic-password" label="Password*" variant="outlined" />
        <Button onClick={()=>{sendNewStudent()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px"}}>Создать</Button>
        <ToastContainer autoClose={1500}/>
      </div>
    </div>
  )
}