import HeaderTeacher from "../Header/HeaderTeacher"
import css from './Accauntant.module.css'
import { NavLink } from "react-router-dom";
import { Button } from 'antd';
import * as React from 'react';
import Switch from '@mui/material/Switch';

import Transactions from './Transactions'
import StudentsBalances from './StudentsBalances'




const label = { inputProps: { 'aria-label': 'Color switch demo' } };


function Accauntant () {

        const [checked, setChecked] = React.useState(true);
      
        const handleChange = (event) => {
          setChecked(event.target.checked);
        };

  return(
    <div style={{backgroundColor: "rgb(216, 222, 236)", minHeight:"100vh"}}>
      <HeaderTeacher />
      <div style={{display:'flex', justifyContent:'center', position:'absolute', top:20, zIndex:9999, color: 'white', right: '200px', fontSize:'16px'}}>
        <div style={{marginTop:'8px'}}>Транзакции</div>
        <Switch {...label} defaultChecked color="default"   onChange={handleChange} />
        <div style={{marginTop:'8px'}}>Балансы студентов</div>
      </div>

      <NavLink to="/admin"><Button style={{position:'absolute', top:'24px', right:'40px', zIndex:99999}}>Admin</Button></NavLink>

        {checked ? <StudentsBalances /> : <Transactions />}
    </div>
  )
}

export default Accauntant