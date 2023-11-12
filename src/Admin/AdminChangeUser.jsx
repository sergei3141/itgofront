import * as React from 'react';
import css from './Admin.module.css'
import { getGroupByUserId, changeStudent } from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

export default function AdminChangeUser(props) {

  const [studentToChange, setStudentToChange] = React.useState()
  const [studentsGroup, setStudentsGroup] = React.useState()
  const [id, setId] = React.useState()

  function getStudentsInfo () {

    setTimeout(()=>{    //place user's data into inputs
      let id = document.getElementById('studentToChange').value.split(',')[0].replace(/[^+\d]/g, '')
      setId(id)
      let currentUser
      for(let i = 0; i < props.usersData.length; i++){
        if(props.usersData[i].id == id){currentUser = props.usersData[i]}
      }
      if(currentUser){
        document.getElementById('changeStudentName').value = currentUser.name
        document.getElementById('changeStudentPhone').value = currentUser.phone
        document.getElementById('changeStudentMail').value = currentUser.email
        document.getElementById('changeStudentTasks').value = currentUser.tasks_completed
        document.getElementById('changeStudentActive').value =  currentUser.active

        getGroupByUserId(id).then((data)=>{
        setStudentsGroup(data.data)
      })
    }
    },0)
  }

  const notifyError = () => toast.error("Заполните все поля!");
  const notifySucces = () => toast.success("Студент создан!");

   function sendNewStudent () {
    let obj = new FormData()
    debugger
    document.getElementById('changeStudentName').value ? obj.append('name', document.getElementById('changeStudentName').value) : console.log(0)
    document.getElementById('changeStudentPhone').value ? obj.append('phone', document.getElementById('changeStudentPhone').value) : console.log(0)
    document.getElementById('changeStudentMail').value ? obj.append('email', document.getElementById('changeStudentMail').value) : console.log(0)
    document.getElementById('changeStudentPassword').value ? obj.append('password', document.getElementById('changeStudentPassword').value) : console.log(0)
    document.getElementById('changeStudentPassword').value ? obj.append('reset', document.getElementById('changeStudentPassword').value) : console.log(0)
    document.getElementById('changeStudentActive').value ? obj.append('active', document.getElementById('changeStudentActive').value) : console.log(0)
    document.getElementById('changeStudentTasks').value ? obj.append('tasks_completed', document.getElementById('changeStudentTasks').value) : console.log(0)
  
      changeStudent(obj, id).then((data)=>{
        console.log(data)
        debugger
        if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}
      })

   }

   const defaultProps = {
    options: props.usersData,
    getOptionLabel: (option) => `id:${option.id}, ${option.name}, phone:${option.phone}`,
  }


  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)',}}><b>Изменить студента</b></div>
      <div style={{display:'flex'}}>
        <Autocomplete
        style={{width:'80%'}}
        {...defaultProps}
        disablePortal
        id="studentToChange"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Student's name" />}
        onChange={()=>{getStudentsInfo()}}
      />
      <div style={{margin:'auto', marginTop:"-28px"}}>
        <div style={{marginBottom:'8px'}}>active (0-1 only!)</div>
        <TextField id="changeStudentActive" variant="outlined" />
      </div>
    </div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
        <div>
          <div>Name</div>
          <TextField id="changeStudentName" variant="outlined" />
        </div>
        <div>
          <div>Phone</div>
        <TextField id="changeStudentPhone" variant="outlined" />
        </div>
        <div>
          <div>Mail</div>
        <TextField id="changeStudentMail"  variant="outlined" />
        </div>
        <div>
          <div>Password</div>
        <TextField id="changeStudentPassword"  variant="outlined" />
        </div>
        {/* <TextField id="outlined-basic-password" label="Password*" variant="outlined" /> */}
        <Button onClick={()=>{sendNewStudent()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", marginTop:'20px'}}>Создать</Button>
        <ToastContainer autoClose={1500}/>



      </div>
      
      <div>
        <div style={{margin:"20px 0px 10px 0px"}}>Completed tasks</div>
        <TextField id="changeStudentTasks"  variant="outlined" style={{width:"100%"}}/>
      </div>
        <div style={{textAlign:'start', marginTop: '20px', display:"flex"}}>
          <div>Студент состоит в следующих группах:</div>
            {studentsGroup?.map((el)=>{
              return(<div style={{marginLeft:'16px'}}>{`${el.name}`}</div>)
            })}
          </div>
      </div>
  )
}
