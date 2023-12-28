import * as React from 'react';
import css from './Admin.module.css'
import { getGroupByUserId, changeStudent, setTransaction} from '../API/API';

import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { ToastContainer,toast}from'react-toastify';import'react-toastify/dist/ReactToastify.css';
import Autocomplete from '@mui/material/Autocomplete';


export default function AdminChangeUser(props) {

  console.log(props.usersData)

  const [balance, setBalance] = React.useState()
  const [sumToPay, setSumToPay] = React.useState()
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
        currentUser.email ? document.getElementById('changeStudentMail').value = currentUser.email : document.getElementById('changeStudentMail').value = ''
        currentUser.tasks_completed ?  document.getElementById('changeStudentTasks').value = currentUser.tasks_completed :  document.getElementById('changeStudentTasks').value = ''
        document.getElementById('changeStudentActive').value =  currentUser.active
        currentUser.parents ? document.getElementById('changeStudentParents').value = currentUser.parents :  document.getElementById('changeStudentParents').value = ''
        currentUser.parents_phone ? document.getElementById('changeStudentParentsPhone').value = currentUser.parents_phone : document.getElementById('changeStudentParentsPhone').value = ''
        setBalance(currentUser.balance)
        currentUser.sales ? document.getElementById('changeStudentSales').defaultValue = currentUser.sales : document.getElementById('changeStudentSales').defaultValue = ''

        getGroupByUserId(id).then((data)=>{
        setStudentsGroup(data.data)
      })
    }
    },0)
  }

  const notifyError = () => toast.error("Что-то пошло не так :(");
  const notifySucces = () => toast.success("Данные изменены!");

   function sendNewStudent () {
    let obj = new FormData()
    let sumBallance =  (+document.getElementById('changeStudentBalancePlus').value || 0) + +balance
    document.getElementById('changeStudentName').value ? obj.append('name', document.getElementById('changeStudentName').value) : console.log(0)
    document.getElementById('changeStudentPhone').value ? obj.append('phone', document.getElementById('changeStudentPhone').value) : console.log(0)
    document.getElementById('changeStudentMail').value ? obj.append('email', document.getElementById('changeStudentMail').value) : obj.append('mail', '')
    document.getElementById('changeStudentPassword').value ? obj.append('password', document.getElementById('changeStudentPassword').value) : console.log(0)
    document.getElementById('changeStudentPassword').value ? obj.append('reset', document.getElementById('changeStudentPassword').value) : console.log(0)
    document.getElementById('changeStudentActive').value ? obj.append('active', document.getElementById('changeStudentActive').value) : obj.append('active', 1)
    document.getElementById('changeStudentTasks').value ? obj.append('tasks_completed', document.getElementById('changeStudentTasks').value) : obj.append('tasks_completed', '0')
    document.getElementById('changeStudentParents').value ? obj.append('parents', document.getElementById('changeStudentParents').value) : obj.append('parents', '')
    document.getElementById('changeStudentParentsPhone').value ? obj.append('parents_phone', document.getElementById('changeStudentParentsPhone').value) : obj.append('parents_phone', '')
    document.getElementById('changeStudentSales').value ? obj.append('sales', document.getElementById('changeStudentSales').value) : obj.append('sales', '')
    obj.append('balance', sumBallance)

    let transaction = new FormData();
    document.getElementById('changeStudentName').value ? transaction.append('student', document.getElementById('changeStudentName').value) : console.log(0)
    document.getElementById('changeStudentPhone').value ? transaction.append('student_phone', document.getElementById('changeStudentPhone').value) : console.log(0)
    document.getElementById('changeStudentBalancePlus').value ? transaction.append('add_to_balance', document.getElementById('changeStudentBalancePlus').value) : console.log(0)
    document.getElementById('changeStudentAcceptSalePercent').value ? transaction.append('percent_sale', document.getElementById('changeStudentAcceptSalePercent').value) : console.log(0)
    document.getElementById('changeStudentAcceptSaleFixed').value ? transaction.append('fixed_sale', document.getElementById('changeStudentAcceptSaleFixed').value) : console.log(0)
    document.getElementById('changeStudentSales').value ? transaction.append('personal_sale_info', document.getElementById('changeStudentSales').value) : console.log(0)
    transaction.append('total_balance', sumBallance)
    transaction.append('balance_was', balance)
    transaction.append('user_paid', sumToPay || 0)
      //To accountant send
      setTransaction(transaction).then((data)=>{})

      changeStudent(obj, id).then((data)=>{
        if(data.status == 200){notifySucces();window.location.reload()}else{notifyError()}
      })
   }

   const defaultProps = {
    options: props.usersData,
    getOptionLabel: (option) => `id:${option.id}, [${option.active}], ${option.name}, phone:${option.phone}`,
  }

  function calculate () {
    let balancePlus = document.getElementById('changeStudentBalancePlus').value
    let saleFixed = document.getElementById('changeStudentAcceptSaleFixed').value
    console.log(saleFixed)
    let salePercent = document.getElementById('changeStudentAcceptSalePercent').value
 
    setSumToPay((balancePlus - saleFixed)*(100-salePercent)/100)

  }


  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)',}}><b>Изменить студента</b> <Button style={{marginLeft:'30px'}} onClick={props.getUnactiveUsers}>Запросить неактивных пользователей в том числе (для всех таблиц)</Button></div>
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
        <div>
          <div>Parents</div>
        <TextField id="changeStudentParents"  variant="outlined" />
        </div>
        <div>
          <div>Parents phone</div>
        <TextField id="changeStudentParentsPhone"  variant="outlined" />
        </div>
        <ToastContainer autoClose={1500}/>
      </div>
      
      <div>
        <div style={{margin:"20px 0px 10px 0px"}}>Completed tasks</div>
        <TextField id="changeStudentTasks"  variant="outlined" style={{width:"100%"}}/>
      </div>

      <div style={{display:'flex', flexWrap:'wrap', marginTop:'20px'}}>
        <div>
          <div>Информация о персональных скидках</div>
          <textarea id="changeStudentSales" style={{width:'500px', height:'150px'}}></textarea>
        </div>
        <div style={{width:'500px'}}>
          <div>Начислить клиенту на баланс</div>
          <TextField id="changeStudentBalancePlus"  variant="outlined" style={{width:'400px'}} onChange={calculate}/>
          <div style={{display:'flex'}}>
            <div style={{ margin:'20px', marginLeft:'60px', textAlign:'start'}}>
              <div style={{marginBottom:'20px'}}>К оплате с учётом скидки: </div>
              <div>Баланс:</div>
            </div>
            <div style={{margin:'20px', marginLeft:'60px'}}>
              <div style={{marginLeft:'20px', marginBottom:'20px'}}><b>{new Intl.NumberFormat('ru-RU').format(sumToPay || 0)}</b></div>
              <div style={{marginLeft:'20px'}}><b>{new Intl.NumberFormat('ru-RU').format(balance || 0)}</b></div>
            </div>
          </div>
        </div>
        <div >
          <div>Применить скидку в %</div>
          <TextField id="changeStudentAcceptSalePercent"  variant="outlined" style={{width:'300px'}} onChange={calculate}/>
          <div style={{marginTop:'20px'}}>Применить фиксированную скидку</div>
          <TextField id="changeStudentAcceptSaleFixed"  variant="outlined" style={{width:'300px'}} onChange={calculate}/>
        </div>
      </div>

      <Button onClick={()=>{sendNewStudent()}} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", marginTop:'20px', width:'100%'}}>Изменить</Button>
        <div style={{textAlign:'start', marginTop: '20px', display:"flex"}}>
          <div>Студент состоит в следующих группах:</div>
            {studentsGroup?.map((el)=>{
              return(<div style={{marginLeft:'16px'}}>{`${el.name}`}</div>)
            })}
          </div>
      </div>
  )
}
