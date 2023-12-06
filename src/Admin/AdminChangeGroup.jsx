import * as React from 'react';
import css from './Admin.module.css'
import {changeGroupById, getAllGroups, } from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';

export default function AdminChangeGroup(props) {

  const [groupsList, setGroupsList] = React.useState()
  const [id, setId] = React.useState()

  React.useEffect (()=>{
    getAllGroups().then((data)=>{

    //Sort (active to top)

    data.sort((a, b) =>  parseFloat(b.active) - parseFloat(a.active));

console.log(data)

      setGroupsList(data)
    })

  },[])

  function getStudentsInfo () {




    setTimeout(()=>{    //place user's data into inputs
      let id = document.getElementById('groupToChange').value.split(',')[0].replace(/[^+\d]/g, '')
      setId(id)
      let currentGroup
      for(let i = 0; i < groupsList.length; i++){
        if(groupsList[i].id == id){currentGroup = groupsList[i]}
      }
      document.getElementById('changeGroupActive').value = currentGroup.active
      // document.getElementById('changeStudentPhone').value = currentUser.phone
      // document.getElementById('changeStudentMail').value = currentUser.email

        // getGroupByUserId(id).then((data)=>{
        // setStudentsGroup(data.data)


    },0)

  }

  const notifyError = () => toast.error("Ошибка");
  const notifySucces = () => toast.success("Статус изменён!");

   function sendNewStudent () {
    let obj = new FormData()
     obj.append('active', document.getElementById('changeGroupActive').value)
     changeGroupById(id, obj).then((data)=>{
      if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}
     })
   }

   const defaultProps = {
    options: groupsList,
    getOptionLabel: (option) => `id:${option.id}, ${option.name}, ${option.active == 1 ? "Active" : "Disactive"}`,
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)',}}><b>Изменить статус группы</b></div>
      <div style={{display:'flex'}}>
        <Autocomplete
        style={{width:'60%'}}
        {...defaultProps}
        disablePortal
        id="groupToChange"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Group name" />}
        onChange={()=>{getStudentsInfo()}}
      />
      <div style={{margin:'auto', marginTop:"-28px"}}>
        <div style={{marginBottom:'8px'}}>active (0-1 only!)</div>
        <TextField id="changeGroupActive" variant="outlined" />
      </div>
      <div style={{display:'flex', justifyContent:'space-between',}}>
        <Button onClick={()=>{sendNewStudent(id)}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", }}>Изменить</Button>
        <ToastContainer autoClose={1500}/>
      </div>
    </div>
      </div>
  )
}
