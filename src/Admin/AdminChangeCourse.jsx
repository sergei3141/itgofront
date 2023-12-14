import * as React from 'react';
import css from './Admin.module.css'
import { changeCourseById } from '../API/API';
import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast }from'react-toastify';import'react-toastify/dist/ReactToastify.css';

export default function AdminCreateCourse(props) {
  
  const [id, setId] = React.useState(0)

  const notifyError = () => toast.error("Что-то пошло не так!");
  const notifySucces = () => toast.success("Название курса изменено!");

  function sendCourse () {
    let obj = new FormData
    obj.append('name', document.getElementById('outlined-basic-renameCourse').value)
    obj.append('price', document.getElementById('outlined-basic-priceCourse').value)
    changeCourseById(obj, id).then((data)=>{
      if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}
    })
  }

  const defaultProps = {
    options: props.courses,
    getOptionLabel: (option) => `id:${option.id}, ${option.label}`,
  }

  return(
    <div className={css.card}>
        <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)', margin:'10px'}}><b>Переименовать или изменить стоимость курса</b></div>
        <div style={{display:'flex', justifyContent:'space-between'}}>

        <Autocomplete
        onChange={(e)=>{
          setTimeout(()=>{
            setId(document.getElementById('combo-box-courses').value.split(',')[0].replace(/[^+\d]/g, ''))
            console.log(document.getElementById('combo-box-courses').value.split(',')[0].replace(/[^+\d]/g, ''))
            document.getElementById('outlined-basic-renameCourse').value = e.target.innerHTML.split(',')[1].trim()
          },10)
}}
        disablePortal
        {...defaultProps}

        id="combo-box-courses"

        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Выберите курс" />}
      />

      <div style={{marginTop:'-20px'}}>
        <div>Новое название курса</div>
        <TextField id="outlined-basic-renameCourse" variant="outlined" style={{width:'450px'}} />
      </div>
      <div style={{marginTop:'-20px'}}>
        <div>Новая цена курса</div>
        <TextField id="outlined-basic-priceCourse" variant="outlined" style={{width:'150px'}} />
      </div>
      
        <Button onClick={()=>{sendCourse()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", marginLeft:'30px'}}>изменить</Button>
        <ToastContainer autoClose={1500}/>
        </div>
        <div style={{marginTop:'20px'}}>Цена указывается лишь для отображения на главной странице (для пользователей). На технические вычисления не влияет!</div>

    </div>
  )
}