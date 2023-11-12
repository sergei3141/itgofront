import css from './Other.module.css'
import TextField from '@mui/material/TextField';

function Map() {
    return (
      <div>
        <div><h1 style={{textAlign:'left', marginLeft:'30px'}}>Как нас найти</h1></div>
        <section  className = {css.sectionOne} style={{backgroundColor:'rgb(242, 242, 242)'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abbbf2540bde2b2b89032b25350d7b0f7fe5c11d3e5c3088abcd0444f56a6bf61&amp;source=constructor" width="50%"  height="500px" frameborder="0"></iframe>
            <div style={{width:'50%'}}>
            <h3>Поможем в выборе!</h3>
            <div style={{lineHeight:'1.5', padding:'0px 20px 0px 60px', textAlign:'left'}}>Остались вопросы о формате занятий? Не знаете, что подойдёт именно вам? Оставьте свой номер - мы перезвоним и ответим на все вопросы!</div>
                <div style={{padding:'40px 40px 10px 40px', }}>
                <TextField id="outlined-basic" label="Имя" variant="outlined" style={{width:'100%', margin:"0px 20px 20px"}}/>
                <TextField id="outlined-basi" label="Телефон" variant="outlined" style={{width:'100%', margin:"0px 20px 20px"}}/>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
                <div  className={css.question__button} style={{width:'50%', margin:"0px 20px 20px"}}>
                    Перезвоните мне!
                </div>
                <div style={{width:'50%', margin:"0px 20px 20px", fontSize:'11px', color:'gray', textAlign:'start'}}>
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