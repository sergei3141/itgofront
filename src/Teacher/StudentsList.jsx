import React, { useEffect } from 'react'
import css from './Teacher.module.css'
import { NavLink } from 'react-router-dom';
import { changeUsersTask } from '../API/API';


export default function StudentsList (props) {
console.log(props)
const [list, setList] = React.useState([])
const [tasks, setTasks] = React.useState([])
let a = []
let u

//React.useEffect(()=>{

  if (props?.students && props?.compose && props?.lessons){
    for (let i = 0; i < props.students.length; i++){
      let obj = {}
      let marks = []
      obj.name = props.students[i].name
      obj.id = props.students[i].id
      for (let j = 0; j < props?.compose.length; j++){
        marks.push(props.compose[j].studentsAndMarks[i])
      }
      obj.marks = marks
      props.students[i].tasks_completed ? obj.tasks_completed = props.students[i].tasks_completed.split(',') : console.log(0)
    
      a.push(obj)
    }

        let tasks = ''
    for(let i = 0; i < props.lessons.length; i++){
      if(props.lessons[i].hw){tasks = tasks + props.lessons[i].hw + ','}
      if(props.lessons[i].cw){tasks = tasks + props.lessons[i].cw + ','}
    }
    let tasksArr = tasks.split(',')
    u = tasksArr.filter((item, i, ar) => ar.indexOf(item) === i);
 
    if(u[u.length-1] == ''){u.pop()}


  }

function completeTask (id, num, tasks_completed, name){
  document.getElementById(name + id + num + 'tasks').remove()
 tasks_completed.push(num)

 let c = tasks_completed.sort(function(a, b) {
  return a - b;
});

let d = c.join()

 let obj = new FormData
 obj.append('tasks_completed', tasks_completed)
 console.log(d)
 changeUsersTask(obj, id)
}

  // }

//},[])



  return(
    <div className={css.card}>
      {a.map((elem)=>{
elem.tasks_completed ? console.log(0) : elem.tasks_completed = ['0']
        return(
        <div style={{backgroundColor:'#edf3ff', padding:'10px 20px', margin:'5px'}}>
        <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)',}}><b>{elem.name}</b></div>
        Баллы
          <div className={css.tasks__table}>{elem.marks.map((m)=>{return(<div className={css.tasks__cell} style={{width:'15px'}}>{m?.mark}</div>)})}</div>
        Задолженность (кликните, чтобы пометить выполненным)
        <div className={css.tasks__table}>

        {u?.sort(function(a, b) {return a - b;}).filter(n => !elem.tasks_completed.includes(n)).map(el=>{return(<div className={css.tasks__cell} onClick={()=>{completeTask(elem.id, el, elem.tasks_completed, elem.name)}} id={elem.name + elem.id + el + 'tasks'}>{el}</div>)})}
        </div>
        </div>

    
      )})}
    </div>
  )


}