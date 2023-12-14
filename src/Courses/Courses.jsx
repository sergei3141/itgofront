import { useLocation } from "react-router-dom";
import Header from "../Header/HeaderLanding";
import Map from "../Other/Map";
import Footer from '../Other/Footer'
import css from './Courses.module.css'
import pic11 from '../img/photo/photo12.jpg'
import { Programms } from "../Landing/Landing";

import p1 from '../img/programms/p1.jpeg'
import p2 from '../img/programms/p2.jpg'
import p3 from '../img/programms/p3.jpg'
import p4 from '../img/programms/p4.jpg'
import p5 from '../img/programms/p5.jpg'
import p6 from '../img/programms/p6.jpg'
import p7 from '../img/programms/p7.jpg'
import iconitgo from '../img/programms/iconitgo.png'


import { PROGRAMMS} from '../Landing/InfoBase';
import FormDialog from "../Landing/FormDialog";

function Courses () {

  window.scroll(0,0);

  const location = useLocation();
  const { state } = location;

  return(
    <div>
      <div style={{zIndex:9999, position:'relative'}}>
    <Header></Header>
    </div>
      <div style={{backgroundImage:`url(${state?.from.el.img || PROGRAMMS[0].img})`}} className={css.back}></div>
      <div className={css.backFilter}></div>
      <div className={css.backTime}>{state?.from.el.time || PROGRAMMS[0].time}</div>
      <div className={css.backgroundSplash}>
        {/* {state?.from.el?.splash ?  `Первое занятие ${state?.from.el?.splash?.replace(/[^.\d]/g, '')}` : ''} */}
         {state?.from.el?.splash || PROGRAMMS[0].splash}
        </div>
      <div className={css.backTitle}>
        {state?.from.el.name || PROGRAMMS[0].name}
        <div className={css.backDescription}>
          {state?.from.el.description || PROGRAMMS[0].description}
        </div>
        <div className={css.backPrice}>
          {new Intl.NumberFormat('ru-RU').format(state?.from.el.price || PROGRAMMS[0].price) } <div className={css.backCurrency}>UZS/месяц</div>
          <div className={css.mainText__join} style={{top:'260px', position:'absolute'}}><FormDialog /></div>
        </div>
      </div>

      <div className={css.textContainer}>
        <h1>{state?.from.el.welcome || PROGRAMMS[0].welcome}</h1>
        <div>
          <h3 className={css.titleH3}>О курсе:</h3>
          <div className={css.text}>{state?.from.el.about || PROGRAMMS[0].about}</div>
        </div>
        <div>
          <h3 className={css.titleH3}>Кому будет полезен курс:</h3>
          <div className={css.text}>{state?.from.el.usefull || PROGRAMMS[0].usefull}</div>
        </div>
        <div>
          <h3 className={css.titleH3}>Содержание курса:</h3>
          <div className={css.text}><ul>{state?.from.el.programm.map(el=>{return(<li>{el}</li>)}) || PROGRAMMS[0].programm.map(el=>{return(<li>{el}</li>)})}</ul></div>
        </div>
        <div>
          <h3 className={css.titleH3}>По окончании курса:</h3>
          <div className={css.text}>{state?.from.el.skills || PROGRAMMS[0].skills}</div>
        </div>
      </div>
      <h1>Изучите и другие наши курсы:</h1>
      <Programms />
      <div style={{backgroundImage:`url(${pic11})`, backgroundSize:"cover", paddingTop:'1px', backgroundPosition:'center'}}>
        <Map />
        <Footer/>
      </div>
    </div>
  )
}

export default Courses