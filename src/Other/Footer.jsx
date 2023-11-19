import css from './Other.module.css'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import itgo from '../img/programms/iconitgo.png'

function Map() {
    return (
    <footer className={css.footer}>
        <div className={css.footer__row}>
          <img src={itgo} style={{filter:'invert(100%)', width:'100px', marginTop:'30px'}}></img>
          <h2 style={{fontWeight:"100"}}>Ташкент, улица Фучика 14</h2>
        </div>
        <div className={css.footer__row}>
                  <div className={css.footer__section}>ПОСТУПЛЕНИЕ</div>
                  <div className={css.footer__section}><NavLink to="/students">ЭЛЕКТРОННЫЙ ДНЕВНИК</NavLink></div>
                  <div className={css.footer__section}>РАСПИСАНИЕ</div>
                  <div className={css.footer__section}><a href="/" >ПРОГРАММЫ</a></div>
                  <div className={css.footer__section}>ВОПРОСЫ</div>
        </div>
        <div className={css.footer__row} >
          <div class={css.footer__title} style={{marginTop:'8px'}}>Наши контакты:</div>
          <div style={{display:'flex', paddingLeft:'calc(50% - 75px'}}>
              <div className={css.footer__icons}><Icon icon="bi:telegram" /></div>
              <div className={css.footer__icons}><Icon icon="brandico:instagram-filled" /></div>
              <div className={css.footer__icons}><Icon icon="bi:telephone-fill" /></div>
          </div>
          <div style={{textAlign:"left", marginBottom:'6px', lineHeight:2, paddingLeft:'calc(50% - 70px'}}>itgoschool@mail.ru  </div>
          <div style={{textAlign:"left", marginBottom:'16px', lineHeight:2, paddingLeft:'calc(50% - 80px', width:'200px'}}>+998 (33) 322-48-55</div>

            
      
        </div>
        <div>
      
        </div>
      </footer>

    )
}

export default Map