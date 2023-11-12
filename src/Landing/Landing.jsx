import React, {useEffect, useState} from 'react'
import css from './Landing.module.css'

import ReactSlidy from 'react-slidy'
import 'react-slidy/lib/styles.css'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Fireflies from 'fireflies.js'

import Map from '../Other/Map';
import Footer from '../Other/Footer';

import pic1 from '../img/photo/photo1.jpeg'
import pic2 from '../img/photo/photo2.jpeg'
import pic3 from '../img/photo/photo3.jpeg'
import pic4 from '../img/photo/photo4.jpeg'

import p1 from '../img/programms/p1.jpeg'
import p2 from '../img/programms/p2.jpg'
import p3 from '../img/programms/p3.jpg'
import p4 from '../img/programms/p4.jpg'
import p5 from '../img/programms/p5.jpg'
import p6 from '../img/programms/p6.jpg'
import p7 from '../img/programms/p7.jpg'

const SLIDES = [pic1, pic2, pic3, pic4]
const createStyles = isActive => ({
  background: 'transparent',
  border: 0,
  color: isActive ? '#333' : '#ccc',
  cursor: 'pointer',
  fontSize: '32px'
})

const PROGRAMMS = [
  {id:0, name: "Web-разработка Полный курс", description: "Изучение основных технологий, используемых для frontend разработки. Базовый JS, вёрстка, библиотека React ", time: "90 часов", age: 8, img: p4, filter: "linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.25) 80%, rgba(0, 0, 0, 0.5) 93%, rgba(0, 0, 0, 0.6) 100%);"},
  {id:1, name: `Web-разработка "Экспресс курс`, description: "Изучение JavaScript, HTML, CSS", time: "60 часов", age: 12, img: p3},
  {id:2, name: "JavaScript", description: "Целенаправенное изучение языка JavaScript и браузерного окружения", time: "45 часов", age: 12, img: p7},
  {id:3, name: "Вёрстка и дизайн HTML + CSS + Figma", description: "Научитесь создавать сайты с современным дизайном, работать с вёрсткой и макетами", time: "40 часов", age: 12, img: p5},
  {id:4, name: "React + Redux", description: "Научитесь разрабатывать полнофункциональные приложения с применением соверменных библиотек. Требуется знание Java Script", time: "45 часов", age: 12, img: p1},
  {id:5, name: "Собеседования", description: "Индивидуальные занятия. Подготовка портфолио, проведение собеседований", time: "?? часов", age: 18, img: p6}
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
            <head style={{display:"flex", justifyContent:"space-between", position:"absolute", top:0, color: "white", width:"calc(100% - 40*2px)", height:"65px", alignItems:"center", padding:'10px 40px 10px 40px', borderBottom:'1px rgba(255, 255, 255, 0.21) solid', backgroundColor:'rgba(255, 255, 255, 0.08)'}}>
              <div style={{fontSize:"36px"}}><b>IT GO!</b></div>
              <nav style={{cursor:"pointer", position:"relative", zIndex:"12"}} onClick={()=>{Fireflies.terminate()}}>
                <div className={css.menu__section}><NavLink to="/grade">ПОСТУПЛЕНИЕ</NavLink></div>
                <div className={css.menu__section}><NavLink to="/login">ЭЛЕКТРОННЫЙ ДНЕВНИК</NavLink></div>
                <div className={css.menu__section}><NavLink to="/table">РАСПИСАНИЕ</NavLink></div>
                <div className={css.menu__section}><a href="#programms">ПРОГРАММЫ</a></div>
              </nav>
              <div className={css.num}>+998 (33) 322-48-55</div>
            </head>
            
      {/* <Header /> */}
      {/*      =========    SECTION ONE     =========     */}
        <section id="sec">
          <div className={css.back} id="back">

          </div>

         <div className={css.mainText} style={{zIndex:"1", position:"absolute", top:'calc(30vh - 41px)'}}>Учебный центр <br/> IT GO!</div>
         <div className={css.mainText__subtitle} style={{zIndex:"1", position:"absolute", top:'55vh', fontWeight:'700px'}}>Получи профессию программиста <br/>и стань специалистом в сфере айти разработки</div>
         <div className={css.mainText__join}>Присоединяйтесь!</div>
         {/* <div className={css.mainText__subtitle} style={{zIndex:"1", position:"absolute", top:'85vh'}}>Ташкент, улица Фучика 14<br></br><div style={{fontSize:'20px', fontWeight:'400', lineHeight: 2}}>+998 (33) 322-48-55</div></div> */}
        </section>


        <div style={{height:"6vh", width:"100vw", backgroundColor:"white", position: "absolute", zIndex:"100", bottom:"-6.5vh"}}>

</div>

        <section className = {css.sectionOne} style={{backgroundColor:'white', display:'flex', justifyContent:'space-between'}}>

      <div style={{textAlign:"start", paddingRight:'20px', lineHeight:1.5, width:'40%', padding: "20px 20px 0px 50px", fontSize:"18px"}}> 

        <h1 style={{marginTop:"0px"}}>Наши классы</h1>
        
        <div>• Каждая классная комната оборудована проектором, кондиционером и кулером. Каждая классная комната оборудована проектором, кондиционером и кулером.</div>
        <br></br>
        <div>• Рабочие места для студентов оборудованы всем необходимым. Рабочие места студентов оборудованы всем необходимым</div>
        <br></br>
        <div>• Наши филиалы расположены в пяти минутрах от метро. Наши филиалы расположены в пяти минутрах от метро. Тут должна быть ещё инфа... Наши филиалы расположены в пяти минутрах от метро. Наши филиалы расположены в пяти минутрах</div>
      </div>
      
        <div className={css.reactSlide} style={{width:"50%"}}>
          <ReactSlidy doAfterSlide={updateSlide} slide={actualSlide} infiniteLoop>
            {SLIDES.map(src => (
              <div style={{backgroundImage:`url(${src})`, backgroundSize:"cover", height:"550px",   backgroundPosition: "center"}}></div>
            ))}
          </ReactSlidy>
          {/* <div>
            {SLIDES.map((_, index) => {
              return (<></>
                // <button
                //   key={index}
                //   style={createStyles(index === actualSlide)}
                //   onClick={() => updateSlide({currentSlide: index})}
                // >
                //   &bull;
                // </button>
              )
            })}
          </div> */}
        </div>
    </section >




        {/*      =========    SECTION TWO     =========     */}
        <div style={{maxWidth:"1300px", margin: "auto"}}>
        <section style={{ background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(238, 238, 238) 2%, rgb(238, 238, 238) 100%)", paddingTop:"50px", paddingBottom:"50px"}}>
          <div style={{width:"60%", margin:"auto"}}>
          <a name="programms"></a>
            <h1>Программы обучения</h1>
            <h3>Учебный центр IT-GO! предлагает на выбор несколько курсов по различным направлениям разработки и программирования</h3>
          </div>
          <div className={css.galery} >
            {PROGRAMMS.map(el=>{
              return(
                <div style={{display:"inline-block", overflow:"hidden", margin:"20px", height:'400px'}} onClick={()=>console.log(9)}>
                  <div className={css.card} style={{backgroundImage:`url(${el.img})`, backgroundSize:"cover"}}></div>
                  <div className={css.preCard} style={{zIndex:1, position:"absolute", marginTop:"-404px"}}>
                    <div className={css.prePreCard} style={{padding: "0px 50px 0px 50px"}} >
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










        <h1>Почему выбирают нашу образовательную платформу?</h1>


        

    <div>

            <div className={css.parallax} style={{backgroundImage:`url(${pic2})`}}>
            <div className={css.parallax} style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.1) 93%, rgba(0, 0, 0, 0.0) 100%)'}}>
                <div >
                  <div className={css.parallax__splash} style={{marginLeft:"auto", marginRight:"100px"}}>
                    <div style={{fontSize:"48px"}}>не более 6</div>
                    <div>студентов в одной группе. Преподаватель уделит время каждому</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.parallax} style={{backgroundImage:`url(${pic1})`}}>
              <div className={css.parallax} style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.1) 93%, rgba(0, 0, 0, 0.0) 100%)'}}>
                <div >
                  <div className={css.parallax__splash}>
                    <div style={{fontSize:"48px"}}>>190</div>
                    <div>тестовых заданий, доступных на нашей онлайн-платформе</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.parallax} style={{backgroundImage:`url(${pic3})`}}>
            <div className={css.parallax} style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.1) 93%, rgba(0, 0, 0, 0.0) 100%)'}}>
                <div >
                  <div className={css.parallax__splash}>
                    <div style={{fontSize:"48px"}}>92%</div>
                    <div>выпускников отмечают, что достигли поставленных целей</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section>
            <h1>У вас есть вопросы?</h1>
            <h3 style={{width:"60%", margin:"auto", marginBottom:"40px"}}>Мы собрали часто задаваемые вопросы от родителей. Вы узнаете о приеме в школу, о расписании, оснащении школы и о других важных вопросах.</h3>
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
              <NavLink to="/grade" onClick={()=>{Fireflies.terminate()}} onClick="scroll(0,0); return false" ><div className={css.question__button}>Больше вопросов</div></NavLink>
            </div>
          </section>

   
              {/*      =========    SECTION FIVE     =========     */}
              <Map />
              <Footer/>
  

              {/*      =========    SECTION FOOTER     =========     */}


    </div>

      </div>
  )
}

export default Landing