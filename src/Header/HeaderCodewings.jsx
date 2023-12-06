import css from './Header.module.css'
import {Button} from 'antd'
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className={css.header} style={{display:"felx", justifyContent:"space-between", width:'100%', top:0, position:'relative', marginBottom:'60px'}}>
        <nav>
            <NavLink to="/">
            <div style={{width:'90px', display: 'flex', alignItems: 'center', marginTop:"16px", fontWeight:'700', fontSize:"24px", cursor:"pointer"}}>IT GO!</div>
            </NavLink>
            <div style={{display:"flex", justifyContent:"center", width:'100%'}}>
            </div>
        </nav>
        <NavLink to="/students">
            <Button type="primary" style={{color: 'white', opacity:1, marginRight:'50px'}}>Личный кабинет</Button>
        </NavLink>

   </header>
    )
}

export default Header