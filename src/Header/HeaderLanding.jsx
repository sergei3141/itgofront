import css from './Header.module.css'
import {Button} from 'antd'
import { NavLink } from "react-router-dom";

function Header() {
    return (
    <head style={{display:"flex", justifyContent:"space-between", color: "white", width:"calc(100% - 40*2px)", height:"65px", alignItems:"center", padding:'10px 40px 10px 40px', backgroundColor:"rgb(55, 84, 135)"}}>
        <div style={{fontSize:"24px", cursor:"pointer"}}><NavLink to="/"><b>IT GO!</b></NavLink></div>
        <nav style={{cursor:"pointer", position:"relative", zIndex:"12"}}>
          <div className={css.menu__section}><NavLink to="/grade">ПОСТУПЛЕНИЕ</NavLink></div>
          <div className={css.menu__section}><NavLink to="/students">ЭЛЕКТРОННЫЙ ДНЕВНИК</NavLink></div>
          <div className={css.menu__section}>РАСПИСАНИЕ</div>
          <div className={css.menu__section}><a href="/">ПРОГРАММЫ</a></div>
        </nav>
        <div className={css.num}>+998 (33) 322-48-55</div>
      </head>
    )
}

export default Header