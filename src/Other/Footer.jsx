import css from './Other.module.css'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Map() {
    return (
    <footer style={{backgroundColor:"rgb(55, 84, 135)", padding: "40px 0px 20px 40px", color: "white", display:'flex', justifyContent: 'space-between', }}>
        <div className={'footer__row'}>
          <h2>IT-GO</h2>
          <h2 style={{fontWeight:"100"}}>Ташкент, улица Фучика 14</h2>
        </div>
        <div className={'footer__row2'}>
                  <div className={css.footer__section}>ПОСТУПЛЕНИЕ</div>
                  <div className={css.footer__section}><NavLink to="/students">ЭЛЕКТРОННЫЙ ДНЕВНИК</NavLink></div>
                  <div className={css.footer__section}>РАСПИСАНИЕ</div>
                  <div className={css.footer__section}><a href="/" >ПРОГРАММЫ</a></div>
                  <div className={css.footer__section}>ВОПРОСЫ</div>
        </div>
        <div className={css.footer__row}>
          <div class={css.footer__title}>Наши контакты:</div>
          <div style={{textAlign:"left", marginBottom:'6px'}}>itgoschool@mail.ru  </div>
          <div style={{textAlign:"left", marginBottom:'16px'}}>+998 (33) 322-48-55</div>
            <div style={{display:'flex'}}>
              <div className={css.footer__icons}><Icon icon="bi:telegram" /></div>
              <div className={css.footer__icons}><Icon icon="brandico:instagram-filled" /></div>
              <div className={css.footer__icons}><Icon icon="bi:telephone-fill" /></div>
            </div>
            
      
        </div>
        <div>
      
        </div>
      </footer>

    )
}

export default Map