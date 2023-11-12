import css from './Login.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { auth } from '../API/API';



export default function Login() {
  const navigate = useNavigate();

  function authorize () {
    let obj = new FormData()
    obj.append('phone', document.getElementById('loginPhone').value)
    obj.append('password', document.getElementById('loginPassword').value)
    auth(obj).then(()=>{if(localStorage.getItem('jwt')){return navigate("/students")}})}

  return (
    <div>
      <div className={css.back} style={{margin:'calc(-50vh + 190px) auto'}}>
      </div>
      <Card style={{width: '400px', height:'320px', margin:'calc(50vh - 190px) auto', padding:"30px"}}>
        <h2>Войдите в вашу учётную запись</h2>
          <TextField
            style={{width:'60%', margin:"10px"}}
            required
            id="loginPhone"
            label="Телефон"
            defaultValue=""
          />
          <TextField
            style={{width:'60%', margin:"10px"}}
            required
            id="loginPassword"
            label="Пароль"
            defaultValue=""
          />

      <Button className={css.login__button} onClick={authorize}>Войти!</Button>
      </Card>
    </div>
  );
}