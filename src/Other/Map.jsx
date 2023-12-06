import css from './Other.module.css'
import TextField from '@mui/material/TextField';
import { ToastContainer,toast }from'react-toastify';import'react-toastify/dist/ReactToastify.css';
import { createNewClient, getAdress } from '../API/API';
import { useEffect, useState } from 'react';


function Map() {

  const notifyError = () => toast.error("Попробуйте отключить VPN");
  const notifySucces = () => toast.success("Данные отправлены :)");
  const notifyWarning = () => toast.warning("Заполните все поля :)");

  const [adress, setAdress] = useState([])

  useEffect(()=>{
    getAdress().then((data)=>{
      setAdress(data.data[0])
    })
  },[])

  function sendToServer () {
    let obj = new FormData()

    if(document.getElementById('outlined-basic-name').value && document.getElementById('outlined-basic-phone').value){
      obj.append('name', document.getElementById('outlined-basic-name').value)
      obj.append('phone', document.getElementById('outlined-basic-phone').value)
      createNewClient(obj).then((data)=>{
        if(data){notifySucces()
          document.getElementById('outlined-basic-name').value = ''
          document.getElementById('outlined-basic-phone').value = ''
        }else{notifyError()}
      })
    }else{
      notifyWarning()
    }
  }

    return (
      <div style={{color:'white'}}>
        <div><h1 style={{textAlign:'left', marginLeft:'30px', textAlign:'center'}}>Как нас найти</h1></div>
        <section  className = {css.sectionOne} >
          <div className={css.mapAndPhone} >
          <iframe src={adress?.mapUrl} className={css.mapAndPhone_map}  height="500px" frameborder="0"></iframe>
            <div className={css.mapAndPhone_phone}>
              <h3>Поможем в выборе!</h3>
              <div style={{lineHeight:'1.5', padding:'0px 60px 0px 60px', textAlign:'left'}}>
                Остались вопросы о формате занятий? Не знаете, что подойдёт именно вам? Оставьте свой номер - мы перезвоним и ответим на все вопросы В ТЕЧЕНИЕ ЧАСА!
              </div>
              <div className={css.phoneForm} >
                <TextField id="outlined-basic-name" label="Имя" variant="outlined" style={{width:"calc(100% - 80px)", margin:"0px 20px 20px", color:'white', backgroundColor:'white', opacity:0.6, borderRadius:'4px'}}/>
                <TextField id="outlined-basic-phone" label="Телефон" variant="outlined" style={{width:"calc(100% - 80px)", margin:"0px 20px 20px", color:'white', backgroundColor:'white', opacity:0.6, borderRadius:'4px'}}/>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
                  <div  className={css.question__button} style={{width:'50%', margin:"0px 20px 20px", filter:'brightness(130%)'}} onClick={sendToServer}>
                    Перезвоните мне!
                  </div>
                  <div className={css.disclammer} >
                    Нажимая на кнопку, я соглашаюсь на обработку персональных данных и с Правилами пользования платформой
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
        <ToastContainer autoClose={1500}/>
      </div>
    )
}

export default Map