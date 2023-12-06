import HeaderTeacher from "../Header/HeaderTeacher"
import css from './Content.module.css'
import { NavLink } from "react-router-dom";
import { Button } from 'antd';
import ContentAdress from "./ContentAdress";






function Content () {

  return(
    <div style={{backgroundColor: "rgb(216, 222, 236)", minHeight:"100vh"}}>
      <HeaderTeacher />
      <NavLink to="/admin"><Button style={{position:'absolute', top:'24px', right:'40px', zIndex:99999}}>Admin</Button></NavLink>
      <div>
        <ContentAdress />

      </div>

    </div>
  )
}

export default Content