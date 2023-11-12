import css from './Header.module.css'
import {Button} from 'antd'
import { NavLink } from "react-router-dom";

function Header(props) {
    return (
       <header className={css.header} style={{display:"felx", justifyContent:"space-between"}}>
            <nav>
                <NavLink to="/">
                <div style={{width:'90px', display: 'flex', alignItems: 'center', marginTop:"16px", fontWeight:'700', fontSize:"24px", cursor:"pointer"}}>IT-GO!</div>
                </NavLink>
                <div style={{display:"flex", justifyContent:"center", width:'100%'}}>
                    <div className={css.header__link}><a>{props.propsHeaderData?.name}</a></div>
                    <div className={css.header__link}><a>Балл: 4,8</a></div>
                    <div className={css.header__link}><a>Заданий: 10</a></div>
                </div>
            </nav>
            <NavLink to="/codewings">
                <Button type="primary" style={{color: 'white', opacity:1}}>CodeWings</Button>
            </NavLink>
       </header>
    )
}

export default Header