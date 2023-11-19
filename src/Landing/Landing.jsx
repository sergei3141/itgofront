import React, {useEffect, useState} from 'react'
import css from './Landing.module.css'
import { Icon } from '@iconify/react';

import ReactSlidy from 'react-slidy'
import 'react-slidy/lib/styles.css'
import { NavLink } from 'react-router-dom';
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

import Map from '../Other/Map';
import Footer from '../Other/Footer';

import pic2 from '../img/photo/photo1.jpeg'
import pic1 from '../img/photo/photo2.jpeg'
import pic3 from '../img/photo/photo3.jpeg'
import pic4 from '../img/photo/photo4.jpeg'
import pic7 from '../img/photo/photo7.jpg'
import pic8 from '../img/photo/photo8.jpg'
import pic9 from '../img/photo/photo9.jpg'
import pic10 from '../img/photo/photo10.jpg'
import pic11 from '../img/photo/photo12.jpg'
import itgo from '../img/programms/iconitgo.png'

import p1 from '../img/programms/p1.jpeg'
import p2 from '../img/programms/p2.jpg'
import p3 from '../img/programms/p3.jpg'
import p4 from '../img/programms/p4.jpg'
import p5 from '../img/programms/p5.jpg'
import p6 from '../img/programms/p6.jpg'
import p7 from '../img/programms/p7.jpg'
import iconitgo from '../img/programms/iconitgo.png'
import Header from '../Header/HeaderLanding';

const SLIDES = [
  {'pic': pic1, 'marginTop' : '130px', 'text': `Качество знаний - наш приоритет. Поэтому мы проводим обучение исключительно в мини-группах не более 6 студентов. Преподаватель уделит время каждому`}, 
  {'pic': pic7, 'marginTop' : '130px', 'text': `Наша онлайн-платформа работает круглосуточно. Студент может выполнить задания в любое удобное время и сразу же получить результат!`}, 
  {'pic': pic3, 'marginTop' : '130px', 'text': 'Мы гарантируем качество знаний. После успешной сдачи экзамена вы получите сертификат об окончании образовательной программы '}, 
  {'pic': pic8, 'marginTop' : '110px', 'text': 'Наши классы оборудованы всем необходимым. Обучение проводится на соверменных компьютерах, но вы можете использовать и ваши личные устройства'}]
const createStyles = isActive => ({
  background: 'transparent',
  border: 0,
  color: isActive ? '#333' : '#ccc',
  cursor: 'pointer',
  fontSize: '32px'
})

const PROGRAMMS = [
  {id:0, name: "Web-разработка Полный курс", description: "Изучите основные технологии и станьте востребованным специалистом в IT-индустрии.", time: "90 часов", age: 8, img: p4, filter: "linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.25) 80%, rgba(0, 0, 0, 0.5) 93%, rgba(0, 0, 0, 0.6) 100%);"},
  {id:1, name: `Web-разработка Экспресс курс`, description: "Изучение базовые технологии web-разработки и создайте ваш первый сайт!", time: "60 часов", age: 12, img: p3},
  {id:2, name: "Программирование JavaScript", description: "Целенаправенное изучение языка JavaScript. Напишите вашу первую программу!", time: "45 часов", age: 12, img: p7},
  {id:3, name: "3D моделирование и дизайн", description: "Научитесь создавать дизайны интерьеров, 3D-анимациию и освойте основы рендеринга в 3ds MAX", time: "40 часов", age: 12, img: p5},
  {id:4, name: "React + Redux", description: "Научитесь разрабатывать полнофункциональные приложения с применением соверменных библиотек. Требуется знание Java Script", time: "45 часов", age: 12, img: p1},
  {id:5, name: "Собеседования", description: "Индивидуальные занятия. Подготовьте портфолио и пройдите тестовое собеседование с опытным специалистом", time: "?? часов", age: 18, img: p6}
]

const QUESTIONS = [
  {user: ["Елизавета", "Как попасть на курсы?"], admin: ["IT-GO", "Свяжитесь с нашим администратором и выберите интересующий вас курс или посетите наш учебный центр лично. Для большинства курсов предварительных знаний не требуется. "]},
  {user: ["Бахитёр", "Какие документы нужны?"], admin: ["IT-GO", "Для заключения договора достаточно любого документа, удостоверяющего личность"]},
  {user: ["Оксана", "Я не знаю, какой курс подойдёт моему ребёнку"], admin: ["IT-GO", "Свяжитесь с нами любым удобным вам способом! Более того, вы можете прийти и посмотреть, как проходят занятия. Это бесплатно."]},
]


function Landing() {
  Fireflies.initialize(undefined, [10, 22], [{ fill: '#ffffff', glow: '#4651b3' }], true, true, true, false)

  
  const [actualSlide, setActualSlide] = useState(0)


  const updateSlide = ({currentSlide}) => {
    setActualSlide(currentSlide)
  }

  //change fireflughts screen
  window.onresize = function(event) {
    document.querySelectorAll('canvas')[0].style.width =  + document.body.clientWidth + 'px'
  };

setTimeout(()=>{
    let bg = document.getElementById('back');
    document.querySelectorAll('canvas')[0].addEventListener('mousemove', function(e) {
      let x = e?.clientX / window?.innerWidth;
      let y = e?.clientY / window?.innerHeight;  
      bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    })
  document.querySelectorAll('canvas')[0].style.position = "absolute"
  document.querySelectorAll('canvas')[0].style.top = '0'
  document.querySelectorAll('canvas')[0].style.opacity = '0.75'
  document.querySelectorAll('canvas')[0].style.zIndex = "10"
}, 0)


  return (
    <div>

{/* For desktop Only */}
      <Header />
      {/*      =========    SECTION ONE     =========     */}
      <section id="sec">
        <div className={css.back} id="back">
        </div>
        <div className={css.mainText} >Учебный центр <br/> IT GO!</div>
        <div className={css.mainText__subtitle}>Получи профессию программиста <br/>и стань специалистом в сфере айти разработки</div>
        <div className={css.mainText__join}>Присоединяйтесь!</div>
      </section>
      <div style={{height:"12.2vh", width:"100vw", backgroundColor:"rgb(242, 242, 242)", position: "absolute", zIndex:"100", bottom:"-12.7vh"}}></div>

      <section style={{background: "linear-gradient(180deg, rgb(242, 242, 242) 0%, rgb(255, 255, 255) 100%)"}}>
      <img src={iconitgo} style={{width:'100px', height:'80px', marginBottom:'-35px', marginTop:"40px", zIndex:'3000', position:'relative'}}></img>
        <h1 >IT GO в цифрах</h1>

        <div className={css.icon}></div>
        <h3 className={css.statistic_subtitle}>Наши курсы дадут вам практические навыки для работы в сфере айти</h3>
        <div className={css.statistic}>
          <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
            <div сlassName={css.statistic_section} style={{minWidth:'200px', margin:'20px 30px 0px 30px'}}>
              <div class={css.statistic_number}>3 года</div>
              <div class={css.statistic_text}>СРЕДНИЙ СТАЖ <br/> ПРЕПОДАВАТЕЛЯ</div>
            </div>
            <div сlassName={css.statistic_section} style={{minWidth:'200px', margin:'20px 30px 0px 30px'}}>
              <div class={css.statistic_number}>6</div>
              <div class={css.statistic_text}>СТУДЕНТОВ <br/> В ОДНОЙ ГРУППЕ</div>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
            <div сlassName={css.statistic_section} style={{minWidth:'200px', margin:'20px 30px 0px 30px'}}>
              <div class={css.statistic_number}>93%</div>
              <div class={css.statistic_text}>ОТМЕЧАЮТ, ЧТО <br/>ДОСТИГЛИ ЦЕЛЕЙ</div>
            </div>
            <div сlassName={css.statistic_section} style={{minWidth:'200px', margin:'20px 30px 0px 30px'}}>
              <div class={css.statistic_number}>190+</div>
              <div class={css.statistic_text}>ЗАДАНИЙ НА НАШЕЙ <br/>ОНЛАЙН ПЛАТФОРМЕ</div>
            </div>
          </div>
        </div>
        <div className={css.school_background}></div>
        <div className={css.reactSlide}>
          <ReactSlidy doAfterSlide={updateSlide} slide={actualSlide} infiniteLoop>
            {SLIDES.map(src => (
              <div className={css.inSlider}>
                njnioljnoi
                <div className={css.inSlider_pic} style={{backgroundImage:`url(${src.pic})`}}>
                </div>
                <div className={css.inSlider_text}><textarea className={css.inSlider_textarea} style={{ marginTop:`${src.marginTop}`}} disabled={true}>{src.text}</textarea></div>
              </div>
            ))}
          </ReactSlidy>
          <div>
            {SLIDES.map((_, index) => {
              return (
                <button
                  key={index}
                  style={createStyles(index === actualSlide)}
                  onClick={() => updateSlide({currentSlide: index})}
                >
                  &bull;
                </button>
              )
            })}
          </div>
        </div>
      </section>

        {/*      =========    SECTION TWO     =========     */}
        <div style={{}}>
        <section style={{ paddingTop:"50px", paddingBottom:"50px", maxWidth:"1300px", margin: "auto"}}>
          <div className={css.courses}>
          <a name="programms"></a>
            <h1>Программы обучения</h1>
            <h3 className={css.courses_subtitle}>Запишитесь на курсы по следующим направлениям</h3>
          </div>
          
          <div className={css.galery} >
            {PROGRAMMS.map(el=>{
              return(
                <div style={{display:"inline-block", overflow:"hidden", margin:"20px"}} onClick={()=>console.log(9)}>
                  <div className={css.card} style={{backgroundImage:`url(${el.img})`, backgroundSize:"cover"}}></div>
                  <div className={css.preCard} style={{zIndex:1, position:"absolute"}}>
                    <div className={css.prePreCard}>
                      <div className={css.card__time}>{el.time}</div>
                      <div>
                      <div className={css.card__title} style={{verticalAlign:"bottom", display:"inline-block"}}>{el.name}</div>
                      <div>{el.description}</div>
                      </div>
                      <div className={css.card__button} onClick={()=>console.log(9)}>Узнать больше</div>
                    </div>
                  </div>
                </div>
            )})}
          </div>
        </section>
        <h1>Как проходят наши занятия?</h1>
        <div style={{ backgroundImage:`url(${pic9})`, backgroundSize: 'cover', left:0, position:'relative', backgroundPosition:'center', width:'100%', padding:'100px 0px 100px 0px'}}>
          <div className={css.ourLessons}>
            <div className={css.ourLessons_picture}>
            <img src={pic10} className={css.ourLessons_img}></img>
            <div className={css.ourLessons_title} >
                  Доступ к материалам и заданиям с любого устройства в любое время!
            </div>
            </div>
            <div className={css.ourLessons_blocks}>
              <div style={{margin:'20px 0px 20px 0px'}}>
                <div style={{display:'flex'}}>
                  <div className={css.whiteGrad}>1</div>
                  <div className={css.whiteGrad_subtitle}>Начало урока</div>
                </div>
                <div className={css.ourLessons_text}>
                  В начале каждого урока студенты совместно с преподавателем разбирают домашее задание. Закрепляется предыдущая тема.
                </div>
              </div>

              <div style={{margin:'60px 0px 60px 0px'}}>
                <div style={{display:'flex'}}>
                  <div className={css.whiteGrad}>2</div>
                  <div className={css.whiteGrad_subtitle}>Разбор новой темы</div>
                </div>
                <div className={css.ourLessons_text} >
                  Лекция, презентация и совместная практическая работа - преподватель сделает всё, чтобы студент успешно усвоил материал.
                </div>
              </div>


              <div style={{margin:'20px 0px 20px 0px'}}>
                <div style={{display:'flex'}}>
                  <div className={css.whiteGrad}>3</div>
                  <div className={css.whiteGrad_subtitle}>Закрепление материала</div>
                </div>
                <div className={css.ourLessons_text} >
                  После каждой лекции - самостоятельная работа. Студент сможет испытать свои силы, проходя задания на нашей онлайн платформе
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{position:'absolute', left:0,  backgroundImage:`url(${pic9})`, height:'1000px'}}></div>
          <section>
            <h1>У вас есть вопросы?</h1>
            <h3 className={css.question_subtitle}>Мы собрали часто задаваемые вопросы от родителей. Вы узнаете о приеме в школу, о расписании, оснащении школы и о других важных вопросах.</h3>
            <div>
              {QUESTIONS.map(el => {return(
                <div className={css.question}>
                  <div style={{ }}>
                    <div style={{fontWeight:"100", color:"rgb(62, 62, 62)", marginBottom:"20px"}} >{el.user[0]}:</div>
                    <div style={{marginRight:"50px", fontWeight:"100", color:"rgb(62, 62, 62)", width:'70px'}}>IT-GO:</div>
                  </div>
                  <div >
                    <div style={{marginBottom:"20px"}}><b>{el.user[1]}</b></div>
                    <div style={{fontWeight:'300'}}>{el.admin[1]}</div>
                  </div>
                </div>
              )})}
              <NavLink to="/grade" onClick={()=>{Fireflies.terminate()}} onClick="scroll(0,0); return false" ><div className={css.question__button} style={{marginBottom:'90px', marginTop:'40px'}}>Больше вопросов</div></NavLink>
            </div>
          </section>

   
              {/*      =========    SECTION FIVE     =========     */}

  

              {/*      =========    SECTION FOOTER     =========     */}


    </div>
    <div style={{backgroundImage:`url(${pic11})`, backgroundSize:"cover", paddingTop:'1px', backgroundPosition:'center'}}>
      <Map />
      <Footer/>
    </div>

      </div>
  )
}

export default Landing