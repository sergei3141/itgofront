import css from './Content.module.css'
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { useEffect } from 'react';
import { getAdress, setAdress } from '../API/API';
import { ToastContainer,toast }from'react-toastify';import'react-toastify/dist/ReactToastify.css';

function ContentAdress () {

  const notifyError = () => toast.error("Что-то пошло не так!");
  const notifySucces = () => toast.success("Адрес изменён!");

  useEffect(()=>{
    getAdress().then((data)=>{
      debugger
      document.getElementById('changeMapUrl').value = data.data[0].mapUrl;
      document.getElementById('changeMainTitle').value = data.data[0].adressTitle;
      document.getElementById('changeSubtitle1').value = data.data[0].adressSubtitle1;
      document.getElementById('changeSubtitle2').value = data.data[0].adressSubtitle2;
    })
  },[])

  function sendToServer () {
    let obj = new FormData;
    obj.append('mapUrl', document.getElementById('changeMapUrl').value)
    obj.append('adressTitle', document.getElementById('changeMainTitle').value)
    obj.append('adressSubtitle1', document.getElementById('changeSubtitle1').value)
    obj.append('adressSubtitle2', document.getElementById('changeSubtitle2').value)

    console.log(obj.get('mapUrl'));
    console.log(obj.get('adressTitle'));
    console.log(obj.get('adressSubtitle1'));
    console.log(obj.get('adressSubtitle2'));

    setAdress(obj).then((data)=>{
      if(data){notifySucces()}else{notifyError()}
    })

  }

  return(
    <div className={css.card}>
      <div style={{textAlign:'left', fontSize:'18px', marginBottom:'12px', color:'rgb(55, 84, 135)', margin:'10px'}}><b>Изменить адрес</b></div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div style={{display:'block'}}>
            <div>Map URL</div>
            <TextField id="changeMapUrl" variant="outlined" style={{display:'block', margin:'3px'}}/>
          </div>
          <div style={{display:'block'}}>
            <div>Adress Main Title</div>
            <TextField id="changeMainTitle" variant="outlined" style={{display:'block', margin:'3px'}}/>
          </div>
          <div style={{display:'block'}}>
            <div>Adress subtitle-1</div>
            <TextField id="changeSubtitle1" variant="outlined" style={{display:'block', margin:'3px'}}/>
          </div>
          <div style={{display:'block'}}>
            <div>Adress subtitle-2</div>
            <TextField id="changeSubtitle2" variant="outlined" style={{display:'block', margin:'3px'}}/>
          </div>
          <Button onClick={sendToServer} style={{height:'54px', backgroundColor:'#D0D0F1', padding:"0px 40px", marginTop:'22px'}}>Изменить</Button>
        </div>
        <ToastContainer autoClose={1500}/>
    </div>
  )
}

export default ContentAdress