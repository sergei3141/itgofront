import * as React from 'react';
import css from './Admin.module.css'
import { createNewExercise } from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';

export default function AdminCreateExercise() {

  const notifyError = () => toast.error("Ошибка!");
  const notifySucces = () => toast.success(" Задание создано!");

  function sendNewStudent () {
    let obj = new FormData()
    obj.append('description', document.getElementById('outlined-basic-description').value)
    obj.append('tests', document.getElementById('outlined-basic-tests').value)
    obj.append('testKeys', document.getElementById('outlined-basic-testKeys').value)
    obj.append('tag', document.getElementById('outlined-basic-tag').value)
    obj.append('rank', document.getElementById('outlined-basic-rank').value)
    obj.append('link', document.getElementById('outlined-basic-link').value)

      createNewExercise(obj).then((data)=>{
        if(data.id){notifySucces();window.location.reload()}else{notifyError()}
      })

  }

  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)'}}><b>Создать задание</b></div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <textarea style={{width:'40%'}} placeholder='Description' id="outlined-basic-description"></textarea>
        <textarea style={{width:'40%'}}  id="outlined-basic-tests" defaultValue={`console.log(codeWings());
console.log(codeWings());
console.log(codeWings());`}></textarea>
        <div style={{display:'block'}}>
          <TextField id="outlined-basic-testKeys" label="Test keys" variant="outlined" style={{display:'block', margin:'3px'}}/>
          <TextField id="outlined-basic-tag" label="Tag" variant="outlined" style={{display:'block', margin:'3px'}}/>
          <TextField id="outlined-basic-rank" label="Rank" variant="outlined" style={{display:'block', margin:'3px'}}/>
          <TextField id="outlined-basic-link" label="Link" variant="outlined" style={{display:'block', margin:'3px'}}/>
          <Button onClick={()=>{sendNewStudent()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", width:'100%'}}>Создать</Button>
          <ToastContainer autoClose={1500}/>
      </div>
      </div>

    </div>
  )
}