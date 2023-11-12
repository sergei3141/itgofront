import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from './Grade.module.css'
import 'react-slidy/lib/styles.css'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

import Map from '../Other/Map'
import Footer from '../Other/Footer'

const QUESTIONS = [
  {
    title: "Поступление в IT-GO",
    questions: [{
        userName:"wf",
        adminName:"rjkegkql",
        question:"53432",
        answer:"ldks"
        },
        {
        userName:"4",
        adminName:"ewfwq",
        question:"verv",
        answer:"reqg"
        },
      ]
  },
  {
    title: "Процесс обучения",
    questions: [{
      userName:"ewgwg",
      adminName:"gewgwe",
      question:"ewgwgqqd",
      answer:"rtweberb"
      },
      {
      userName:"",
      adminName:"",
      question:"",
      answer:""
      },]
  },
  {
    title: "Что даст обучение в IT-GO",
    questions: [{
      userName:"32",
      adminName:"424",
      question:"g",
      answer:"sdva"
      },
      {
      userName:"sdav",
      adminName:"lkrgq",
      question:"ewgq34",
      answer:"235"
      },]
  },
]

export default function Grade () {

// ACCORDEON
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
// ACCORDEON

return(
  <div style={{backgroundColor:"rgb(241, 244, 247)"}}>
    <head style={{display:"flex", justifyContent:"space-between", color: "white", width:"calc(100% - 40*2px)", height:"65px", alignItems:"center", padding:'10px 40px 10px 40px', backgroundColor:"rgb(55, 84, 135)"}}>
      <div style={{fontSize:"24px", cursor:"pointer"}}><NavLink to="/"><b>IT GO!</b></NavLink></div>
      <nav style={{cursor:"pointer", position:"relative", zIndex:"12"}}>
        <div className={css.menu__section}><NavLink to="/grade">ПОСТУПЛЕНИЕ</NavLink></div>
        <div className={css.menu__section}><NavLink to="/students">ЭЛЕКТРОННЫЙ ДНЕВНИК</NavLink></div>
        <div className={css.menu__section}>РАСПИСАНИЕ</div>
        <div className={css.menu__section}><a href="#programms">ПРОГРАММЫ</a></div>
      </nav>
      <div className={css.num}>+998 (33) 322-48-55</div>
    </head>
    <div style={{margin:'auto', maxWidth:'1100px'}}>
      <h1 style={{maxWidth:'900px', textAlign:'center',margin:'40px auto', fontSize:"48px"}}>В этом разделе мы собрали самые частые вопросы о поступлении и обучении в IT-GO</h1>
        {QUESTIONS.map(el=>{return(
            <div>
              <Accordion expanded={expanded === el.title} onChange={handleChange(el.title)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ flexShrink: 0 }} style={{fontSize:'22px', fontWeight:'300', padding:"3px"}}>{el.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                  {el.questions.map(underEl=>{return(
                  <div className={css.question}>
                    <div style={{ }}>
                      <div style={{fontWeight:"100", color:"rgb(92, 92, 92)", marginBottom:"20px", fontWeight:'100'}}>{underEl.userName}:</div>
                      <div style={{marginRight:"50px", fontWeight:"100", color:"rgb(92, 92, 92)", width:'70px'}}>{underEl.adminName}:</div>
                    </div>
                    <div >
                      <div style={{marginBottom:"20px"}}><b>{underEl.answer}</b></div>
                      <div style={{fontWeight:'300'}}>{underEl.answer}</div>
                    </div>
                  </div>
                )})}
                  </Typography>
                </AccordionDetails>
              </Accordion>

            </div>
        )})}
                  <Map/>

    </div>
    <Footer />
  </div>
)
}