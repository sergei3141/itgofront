import * as React from 'react';
import css from './Admin.module.css'
import { changeExerciseById, getAllExercises } from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { Icon } from '@iconify/react';

export default function AdminChangeExercise(props) {

  function getExercises () {
    getAllExercises().then((data)=>{
      setExercises(data.data)
    })
  }

  const [exercises, setExercises] = React.useState([''])
  const [id, setId] = React.useState()

  function getExercisesInfo () {

    setTimeout(()=>{    //place user's data into inputs
      let id = document.getElementById('ExerciseToChange').value.split(',')[0].replace(/[^+\d]/g, '')
      setId(id)
      let currentExercise
      for(let i = 0; i < exercises.length; i++){
        if(exercises[i].id == id){currentExercise = exercises[i]}
      }
      if(currentExercise){
        document.getElementById('changeDescription').value = currentExercise.description
        document.getElementById('changeTests').value = currentExercise.tests
        document.getElementById('changeTestKeys').value = currentExercise.testKeys
        document.getElementById('changeTag').value = currentExercise.tag
        document.getElementById('changeRank').value =  currentExercise.rank
        document.getElementById('changeLink').value =  currentExercise.link
        document.getElementById('changeNumber').value =  currentExercise.number
    }
    },0)
  }

  const notifyError = () => toast.error("Что-то пошло не так :(");
  const notifySucces = () => toast.success("Данные изменены!");

   function sendNewStudent () {
    let obj = new FormData()
    document.getElementById('changeDescription').value ? obj.append('description', document.getElementById('changeDescription').value) : console.log(0)
    document.getElementById('changeTests').value ? obj.append('tests', document.getElementById('changeTests').value) : console.log(0)
    document.getElementById('changeTestKeys').value ? obj.append('testKeys', document.getElementById('changeTestKeys').value) : console.log(0)
    document.getElementById('changeTag').value ? obj.append('tag', document.getElementById('changeTag').value) : console.log(0)
    document.getElementById('changeRank').value ? obj.append('rank', document.getElementById('changeRank').value) : console.log(0)
    document.getElementById('changeLink').value ? obj.append('link', document.getElementById('changeLink').value) : console.log(0)
    document.getElementById('changeNumber').value ? obj.append('number', document.getElementById('changeNumber').value) : console.log(0)
  
      changeExerciseById(obj, id).then((data)=>{
        if(!data){notifyError()}else{ if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}}
       
      })

   }

   const defaultProps = {
    options: exercises,
    getOptionLabel: (option) => `id:${option.id}, №:${option.number}, [${option.testKeys}], ${option.description?.substring(0, 80)}`,
  }


  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)',}}><b>Изменить задание</b><Button style={{marginLeft:'30px'}} onClick={getExercises}>Запросить список заданий</Button></div>
      <div >
        <Autocomplete
        style={{width:'80%'}}
        {...defaultProps}
        disablePortal
        id="ExerciseToChange"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Task" />}
        onChange={()=>{getExercisesInfo()}}
        
      />

            <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
      <textarea style={{width:'40%', marginRight:'10px'}} placeholder='Description' id="changeDescription"></textarea>
        <div style={{width:'40%'}}>
          <textarea  id="changeTests" defaultValue={``} style={{width:'100%', height:'190px'}}></textarea>
          <div>№</div>
          <TextField id="changeNumber" variant="outlined" style={{display:'block', margin:'3px'}}/>
        </div>
            <div style={{margin:'auto', marginTop:"-98px"}}>
      <div style={{display:'block'}}>
        <div>Test Keys</div>
          <TextField id="changeTestKeys" variant="outlined" style={{display:'block', margin:'3px'}}/>
          <div>Tag</div>
          <TextField id="changeTag"  variant="outlined" style={{display:'block', margin:'3px'}}/>
          <div>Rank</div>
          <TextField id="changeRank"  variant="outlined" style={{display:'block', margin:'3px'}}/>
          <div>Link</div>
          <TextField id="changeLink"  variant="outlined" style={{display:'block', margin:'3px'}}/>
          <Button onClick={()=>{sendNewStudent()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", width:'100%'}}>Изменить</Button>
          <ToastContainer autoClose={1500}/>
      </div>
      </div>
      </div>



    </div>

      
      <div>
      </div>
      </div>
  )
}
