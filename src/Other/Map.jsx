import css from './Other.module.css'
import TextField from '@mui/material/TextField';

function Map() {
    return (
      <div style={{color:'white'}}>
        <div><h1 style={{textAlign:'left', marginLeft:'30px', textAlign:'center'}}>Как нас найти</h1></div>
        <section  className = {css.sectionOne} >
        <div className={css.mapAndPhone} >
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abbbf2540bde2b2b89032b25350d7b0f7fe5c11d3e5c3088abcd0444f56a6bf61&amp;source=constructor" className={css.mapAndPhone_map}  height="500px" frameborder="0"></iframe>
            <div className={css.mapAndPhone_phone}>
            <h3>Поможем в выборе!</h3>
            <div style={{lineHeight:'1.5', padding:'0px 60px 0px 60px', textAlign:'left'}}>Остались вопросы о формате занятий? Не знаете, что подойдёт именно вам? Оставьте свой номер - мы перезвоним и ответим на все вопросы!</div>
                <div className={css.phoneForm} >
                    <TextField id="outlined-basic" label="Имя" variant="outlined" style={{width:"calc(100% - 80px)", margin:"0px 20px 20px", color:'white', backgroundColor:'white', opacity:0.6, borderRadius:'4px'}}/>
                    <TextField id="outlined-basi" label="Телефон" variant="outlined" style={{width:"calc(100% - 80px)", margin:"0px 20px 20px", color:'white', backgroundColor:'white', opacity:0.6, borderRadius:'4px'}}/>
                    <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
                    <div  className={css.question__button} style={{width:'50%', margin:"0px 20px 20px", filter:'brightness(130%)'}}>
                        Перезвоните мне!
                    </div>
                    <div className={css.disclammer} >
                        Нажимая на кнопку, я соглашаюсь на обработку персональных данных и с Правилами пользования платформой
                    </div>
                    </div>
                </div>

            </div>
        </div>
        </section >
      </div>
    )
}

export default Map