import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import css from './Landing.module.css'
import { createNewClient } from '../API/API';
import { ToastContainer,toast }from'react-toastify';import'react-toastify/dist/ReactToastify.css';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
    
  const notifyError = () => toast.error("Попробуйте отключить VPN");
  const notifySucces = () => toast.success("Данные отправлены :)");
  const notifyWarning = () => toast.warning("Заполните все поля :)");

  function sendToServer () {
    let obj = new FormData()

    if(document.getElementById('client-name').value && document.getElementById('client-phone').value){
      obj.append('name', document.getElementById('client-name').value)
      obj.append('phone', document.getElementById('client-phone').value)
      createNewClient(obj).then((data)=>{
        if(data){notifySucces()
          handleClose()
        }else{notifyError()}
      })
    }else{
      notifyWarning()
    }
  }
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment >
      <div onClick={handleClickOpen} >
        <div className={css.join}>
        Вступить!
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Заказать обратный звонок</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Специалист отвечает в течение часа. Не хотите ждать? Звоните прямо сейчас на номер <a href="tel:+998333224855" style={{color:'blue'}}>+998 (33) 322-48-55</a>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="client-name"
            label="Имя"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="client-phone"
            label="Телефон"
            type="phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={sendToServer}>Перезвоните мне!</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}