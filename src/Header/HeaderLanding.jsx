import css from './Header.module.css'
import { NavLink } from "react-router-dom";
import React, {useEffect, useState} from 'react'

import { Icon } from '@iconify/react';

import 'react-slidy/lib/styles.css'
import Fireflies from 'fireflies.js'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SchoolIcon from '@mui/icons-material/School';

import itgo from '../img/programms/iconitgo.png'

function Header() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  
    setState({ ...state, [anchor]: open });
  };
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem key={''} disablePadding>
          <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={''} />
          </ListItemButton>
        </ListItem>
        <NavLink to="/">
        <ListItem key={'На главную'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <StarBorderIcon/>
            </ListItemIcon>
            <ListItemText primary={'На главную'} />
          </ListItemButton>
        </ListItem>
        </NavLink>
        <NavLink to="/grade">
        <ListItem key={'Поступление'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={'Вопросы'} onClick={()=>{Fireflies.terminate()}}/>
          </ListItemButton>
        </ListItem>
        </NavLink>
        {/* <NavLink to="/table" onClick={()=>{Fireflies.terminate()}}>
        <ListItem key={'Расписание'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary={'Расписание'} />
          </ListItemButton>
        </ListItem>
        </NavLink> */}
        <NavLink to="/login" onClick={()=>{Fireflies.terminate()}}>
        <ListItem key={'Мой дневник'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BorderColorIcon /> 
            </ListItemIcon>
            <ListItemText primary={'Мой дневник'} />
          </ListItemButton>
        </ListItem>
        </NavLink>
        <a href="#programms" onClick={()=>{Fireflies.terminate()}}>
        <ListItem key={'Занятия'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary={'Занятия'} />
          </ListItemButton>
        </ListItem>
        </a>
      </List>
      <Divider />
      <List>
        <div style={{textAlign:'center', margin:'30px 0px 15px 0px'}}>Свяжитесь с нами:</div>
          <ListItem key={'33-322-48-55'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalPhoneIcon/> 
              </ListItemIcon>
              <ListItemText primary={'33-322-48-55'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'itgo@mail.ru'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon/> 
              </ListItemIcon>
              <ListItemText primary={'tigo@mail.ru'} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
      <div style={{textAlign:'center', margin:'30px 0px 15px 0px'}}>Наш адрес:</div>
      <ListItem key={'adress'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddLocationIcon/> 
              </ListItemIcon>
              <ListItemText primary={'Чиланзар Ц 1А/2 (400 м. от метро)'} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  
    return (
      <div>
  
  {/* For desktop Only */}
        <head class={css.head}>
        <NavLink to="/"><div className={css.head_itgo}><b>IT GO!</b></div></NavLink>
          <nav class={css.head_nav} >
          <div className={css.menu__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/courses">ЗАНЯТИЯ</NavLink></div>
          <div className={css.menu__section}><NavLink to="/">ГЛАВНАЯ</NavLink></div>
            <div className={css.menu__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/login">ДНЕВНИК</NavLink></div>
            {/* <div className={css.menu__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/table">РАСПИСАНИЕ</NavLink></div> */}
            <div className={css.menu__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/grade">ВОПРОСЫ</NavLink></div>
          </nav>
          <div className={css.num}><a href="tel:+998333224855" style={{cursor:'pointer'}}>+998 (33) 322-48-55</a></div>
        </head>
  
  {/* For mobile Only */}
  
    <div className={css.head_mobile}>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}><Icon style={{fontSize:'32px', color:'white'}}icon="ion:menu" /></Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
          <div style={{color: 'white', fontSize:'24px', left:60, top:7, position:'absolute'}}><b>IT GO!</b><img src={itgo} style={{filter:'invert(100%)', width:'32px', marginTop:'5px', position:'absolute', top:'-4px', left:'-45px'}}></img></div>
      </div>
      </div>)
}

export default Header