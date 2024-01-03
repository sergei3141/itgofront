import css from './Other.module.css'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import itgo from '../img/programms/iconitgo.png'
import Fireflies from 'fireflies.js'
import { useState, useEffect } from 'react';
import { getAdress } from '../API/API';

function Map() {

  const [adress, setAdress] = useState([])

  useEffect(()=>{
    getAdress().then((data)=>{
      setAdress(data.data[0])
    })
  },[])

    return (
      <div>
    <footer className={css.footer}>
        <div className={css.footer__row}>
          <img src={itgo} style={{filter:'invert(100%)', width:'100px', marginTop:'0px'}}></img>
          <h2 style={{fontWeight:"100"}}>{adress?.adressTitle}<br></br> <div style={{fontSize:'18px',marginTop:'10px'}}>{adress?.adressSubtitle1}<br/>{adress?.adressSubtitle2}</div></h2>
        </div>
        <div className={css.footer__row}>
                  <div className={css.footer__section}> <NavLink to="/">ГЛАВНАЯ</NavLink> </div>
                  <div className={css.footer__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/login">ДНЕВНИК</NavLink></div>
                  {/* <div className={css.footer__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/table">РАСПИСАНИЕ</NavLink></div> */}
                  <div className={css.footer__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/courses">ДИСЦИПЛИНЫ</NavLink></div>
                  <div className={css.footer__section} onClick={()=>{Fireflies.terminate()}}><NavLink to="/grade">ВОПРОСЫ</NavLink></div>
        </div>
        <div className={css.footer__row} >
          <div class={css.footer__title} style={{marginTop:'8px'}}>Наши контакты:</div>
          <div style={{display:'flex', paddingLeft:'calc(50% - 75px'}}>
              <div className={css.footer__icons}><a href="https://telegram.me/Uz_it_go"><Icon icon="bi:telegram" /></a></div>
              <div className={css.footer__icons}><a href="https://www.instagram.com/uz_it_go/"><Icon icon="brandico:instagram-filled" /></a></div>
              <div className={css.footer__icons}><a href="tel:+998333224855"><Icon icon="bi:telephone-fill" /></a></div>
          </div>
          <div style={{textAlign:"left", marginBottom:'6px', lineHeight:2, paddingLeft:'calc(50% - 70px'}}><a href="https://e.mail.ru/compose/?to=itgoschool@mail.ru">itgoschool@mail.ru</a></div>
          <div style={{textAlign:"left", marginBottom:'16px', lineHeight:2, paddingLeft:'calc(50% - 80px', width:'200px'}}><a href="tel:+998333224855">+998 (33) 322-48-55</a></div>
        </div>
        <div>
        </div>
      </footer>
      <div className={css.footer} style={{fontSize:'14px'}}>
        <div style={{opacity: 0.7, textAlign:'left', marginBottom:'-14px', marginTop:'-40px'}}>Информация на сайте носит ознакомительный характер. Подробности уточняйте по телефону или в офсие по адресу г. Ташкент, Чиланзар Ц 1А\2. IT GO не является юридическим лицом или негосудраственным образовательным учреждением, не выдаёт дипломов и\или сертификатов об образовании и не имеет признаков негосудартсвенного образовательного учреждения. Ведёт свою деятельность в лице ИП Сергея Сергеевича Б. в рамках постановления Кабинета Министров Республики Узбекистан от 07.01.2011 г. №6 (Перечень видов деятельности, которыми могут заниматься индивидуальные предприниматели без образования юридического лица). Согласно Перечню документов разрешительного характера в сфере предпринимательской деятельности, утвержденном постановлением Кабинета Министров Республики Узбекистан от 15.08.2013 г. № 225, получение документов разрешительного характера на оказание репетиторских услуг не предусмотрено.</div>
      </div>
      </div>

    )
}

export default Map