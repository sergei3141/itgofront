import css from './Other.module.css'
import Fireflies from 'fireflies.js'
import { NavLink } from 'react-router-dom'

function Warning() {

    return (
      <div className={css.warning}>
        <div className={css.warning__header}>Набор в группы завершён</div>
        <div>Но мы всё ещё принимам студентов на <NavLink to="/courses" onClick={()=>{Fireflies.terminate()}} style={{color: 'blue', cursor:'pointer'}}>индивидуальные занятия</NavLink> с нашим репетитором - Web-разработка, программирование на JavaScript, 3d моделирование и дизайн. Вы сами выбираете время, цели и сроки.</div>
      </div>
    )
}

export default Warning