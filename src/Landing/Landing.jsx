import React, {useEffect, useState} from 'react'
import css from './Landing.module.css'
import FormDialog from './FormDialog'
import { Icon } from '@iconify/react';
import ReactSlidy from 'react-slidy'
import 'react-slidy/lib/styles.css'
import { NavLink } from 'react-router-dom';
import Fireflies from 'fireflies.js'
import { getAllCourses, getTable } from '../API/API';

import { PROGRAMMS, QUESTIONS, SLIDES } from './InfoBase';

import Map from '../Other/Map';
import Footer from '../Other/Footer';
import pic9 from '../img/photo/photo9.jpg'
import pic10 from '../img/photo/photo10.jpg'
import pic11 from '../img/photo/photo12.jpg'

import iconitgo from '../img/programms/iconitgo.png'
import Header from '../Header/HeaderLanding';


const createStyles = isActive => ({
  background: 'transparent',
  border: 0,
  color: isActive ? '#333' : '#ccc',
  cursor: 'pointer',
  fontSize: '32px'
})

export function Programms () {

  const [open, setOpen] = useState([])
  const [courses, setCourses] = useState([])


  React.useEffect(()=>{

    getAllCourses().then((data)=>{
      setCourses(data.data)
      console.log(data.data)
      debugger
    })


    getTable().then((data)=>{
      let arr = []
      for(let i = 0; i < data.data.length; i++){
        if(data.data[i].open){
          let obj = {base: data.data[i].base, splash: data.data[i].open}
          arr.push(obj)
        }
      }
      setOpen(arr)})
  }, [])

  return(
    <div className={css.galery} >
    {PROGRAMMS.map((el)=>{
      open.map((b)=>{if (b.base == el.base){el.splash = b.splash}})
      courses.map((b)=>{if (b.name == el.base){el.price = b.price}})
      console.log(el)
      debugger
      return(
        <NavLink to="/courses" state={{from: {el} }} key={el.id} onClick={()=>{Fireflies.terminate()}}>
          {open.map((b)=>{if (b.base == el.base){return(<div className={css.splash}>{b.splash}</div>)}})} 
          <div style={{display:"inline-block", overflow:"hidden", margin:"20px"}} onClick={()=>console.log(9)}>
            <div className={css.card} style={{backgroundImage:`url(${el.img})`, backgroundSize:"cover", backgroundPosition:'center'}}></div>
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
        </NavLink>
    )})}
  </div>
  )
}

function Landing(props) {

  Fireflies.initialize(undefined, [10, 22], [{ fill: '#ffffff', glow: '#4651b3' }], true, true, true, false)

  const [actualSlide, setActualSlide] = useState(0)


  const updateSlide = ({currentSlide}) => {
    setActualSlide(currentSlide)
  }

  //change fireflughts screen
  window.onresize = function(event) {
    if(document.querySelectorAll('canvas')[0]){document.querySelectorAll('canvas')[0].style.width =  + document.body.clientWidth + 'px'}

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
        <div className={css.mainText__join}><FormDialog /></div>
        <div className={css.mainText__subtitle_adress} >Чиланзар Ц 1А/2</div>
      </section>
      <div style={{height:"12.2vh", width:"100vw", backgroundColor:"rgb(242, 242, 242)", position: "absolute", zIndex:"100", bottom:"-12.7vh"}}></div>

      <section style={{background: "linear-gradient(180deg, rgb(242, 242, 242) 0%, rgb(255, 255, 255) 100%)", marginTop:'20px'}}>
      <img src={iconitgo} style={{width:'100px', height:'80px', marginBottom:'-35px', marginTop:"40px", zIndex:'1', position:'relative'}}></img>
        <h1 >IT GO в цифрах</h1>

        <div className={css.icon}></div>
        <h3 className={css.statistic_subtitle}>Наши курсы дадут вам практические навыки для работы в сфере айти</h3>
        <div className={css.statistic}>
          <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
            <div сlassName={css.statistic_section} style={{minWidth:'200px', margin:'20px 30px 0px 30px'}}>
              <div class={css.statistic_number}>5 лет</div>
              <div class={css.statistic_text}>СТАЖ <br/> ПРЕПОДАВАТЕЛЯ</div>
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
                <div className={css.inSlider_pic} style={{backgroundImage:`url(${src.pic})`}}>
                </div>
                <div className={css.inSlider_text}><textarea className={css.inSlider_textarea} style={{ marginTop:`${src.marginTop}`}} disabled={true}>{src.text}</textarea></div>
              </div>
            ))}
          </ReactSlidy>
          <div className={css.sliderArrowsForPhone}>
            <div className={css.whiteGrad} style={{position:'absolute',  left:10, bottom:15}}>
              <Icon icon="lucide:arrow-left"  className={css.sliderArrowsText}style={{ marginTop:'9px'}}  onClick={() => {if(actualSlide == 0){updateSlide({currentSlide: SLIDES.length-1})}else{updateSlide({currentSlide: actualSlide-1})}}}/>
            </div>
            <div className={css.whiteGrad} style={{position:'absolute', right:10, bottom:15}}>     
            <Icon icon="lucide:arrow-right" className={css.sliderArrowsText}style={{ marginTop:'9px'}} onClick={() => {if(actualSlide == SLIDES.length -1){updateSlide({currentSlide: 0})}else{updateSlide({currentSlide: actualSlide+1})}}}/>
            </div>
          </div>
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
          
          <Programms/>

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
                    <div style={{marginRight:"50px", fontWeight:"100", color:"rgb(62, 62, 62)", width:'70px'}}>IT GO:</div>
                  </div>
                  <div >
                    <div style={{marginBottom:"20px"}}><b>{el.user[1]}</b></div>
                    <div style={{fontWeight:'300'}}>{el.admin[1]}</div>
                  </div>
                </div>
              )})}
              <NavLink to="/grade" onClick={()=>{Fireflies.terminate()}}><div className={css.question__button} style={{marginBottom:'90px', marginTop:'40px'}}>Больше вопросов</div></NavLink>
            </div>
          </section>
    </div>
    <div style={{backgroundImage:`url(${pic11})`, backgroundSize:"cover", paddingTop:'1px', backgroundPosition:'center'}}>
      <Map />
      <Footer/>
    </div>

      </div>
  )
}

export default Landing