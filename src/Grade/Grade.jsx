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
import Header from '../Header/HeaderLanding';

import Map from '../Other/Map'
import Footer from '../Other/Footer'

import pic11 from '../img/photo/photo12.jpg'
import { Box } from '@mui/material';

// const QUESTIONS = [
//   {
//     title: "Поступление в IT GO",
//     questions: [{
//         userName:"wf",
//         adminName:"rjkegkql",
//         question:"Что нужно для поступления?",
//         answer:"Для большинства курсов начальных знаний не требуется. Чтобы заключить договор с IT GO достаточно сообщить администратору номер телефона и имя студента. Вы можете это сделать как по телефону, так и лично, приехав к нам в офис."
//         },
//         {
//           userName:"wf",
//           adminName:"rjkegkql",
//           question:"На какой возраст расчитаны курсы?",
//           answer:"Большинство курсов расчитаны на студентов от 12 лет. Как показывает практика, это минимальный рекомендуемый возраст для прохождения программы. Однако мы советуем также принимать во внимание и личностные качества студента."
//           },
//           {
//             userName:"wf",
//             adminName:"rjkegkql",
//             question:"Когда начинается набор в группу?",
//             answer:'IT GO набирает группы несколько раз в год. Ближайший набор в группу, а также время и дни занятий вы сможете найти во вкладке "Расписание" (находится наверху страницы).'
//           },
//           {
//             userName:"",
//             adminName:"",
//             question:"На каком языке ведётся обучение?",
//             answer:"На данный момент обучение предусмотрено только на русском языке"
//             },
//       ]
//   },
//   {
//     title: "Оплата",
//     questions: [{
//       userName:"ewgwg",
//       adminName:"gewgwe",
//       question:"Как происходит оплата?",
//       answer:"Оплата производится наличными в офисе, банковским переводом или через систему Click или PayMe. Вы можете вносить оплату ежемесячно, однако мы рекомендуем оплатить курс целиком и получить скидку в 10% его стоимости."
//       },
//       {
//       userName:"",
//       adminName:"",
//       question:"Мы пропустили урок. Будут ли за него списаны деньги?",
//       answer:"Поскольку оплата производится за курс, а не за конкретный урок, к сожалению, мы не сможем вам компенсировать его денежный эквивалент, однако по возможности предложим вариант пройти пропущеную тему с другой группой."
//       },{
//       userName:"",
//       adminName:"",
//       question:"Мы передумали, можем ли мы вернуть деньги?",
//       answer:"Конечно! В любой момент вы можете вернуть остаток средств за все оставшиеся календарные месяцы с месяца, следующего за месяцем обращения в администрацию. Обратите внимание, что в целях безопасности мы можем запросить документ, удостоверяющий личность. Начисленные бонусы не могут быть конвертированы в валюту и возврату не подлежат."
//       },]
//   },
//   {
//     title: "Процесс обучения",
//     questions: [{
//       userName:"ewgwg",
//       adminName:"gewgwe",
//       question:"Как будут проходить занятия?",
//       answer:"Урок длится один час двадцать минут. В начале пары преподаватель отметит присутствующих, после чего начнёт разбор новой темы. Лекция, презентация и ряд самостоятельных заданий для закрепления результата - ни один студент не останется без внимания!"
//       },
//       {
//       userName:"",
//       adminName:"",
//       question:"Будут ли задания на дом?",
//       answer:"Да, но перегружать студентов - не наша политика. В качестве домашнего задания мы выдаём лишь необходимый минимум, расчитанный на 30-40 минут работы. Однако если студент почувствует необходимость, наша онлайн-платформа обладает огромной базой заданий различной степени сложности. Задания проверяются автоматически - студент сразу получит результат своей работы!"
//       },{
//       userName:"",
//       adminName:"",
//       question:"Могу ли я контролировать обучение своего ребёнка?",
//       answer:"Конечно! У каждого студента имеется электронный дневник, в котором проставляется информация о посещённых занятиях, назначенных и выполненных заданяих а также отметках, полученных в ходе урока."
//       },
      
    
//     ]
//   },
//   {
//     title: "Что далее?",
//     questions: [{
//       userName:"32",
//       adminName:"424",
//       question:"Можно ли получить профессию после окончаия IT GO?",
//       answer:"Да. У нас есть курсы, которые подразумевают получение профессии с нуля, обычно они длятся 10 месяцев. Более короткие курсы (3-5 месяцев) предполагают изучение отдельно выбранной технологии. Если возникают сомнения, какой курс подойдёт именно вам, наша администрация с радостью вам поможет!"
//       },
//       {
//       userName:"sdav",
//       adminName:"lkrgq",
//       question:"Будет ли у меня портфолио?",
//       answer:"Конечно! Вы сможете пополнить ваше портфолио одним или несколькими проектами в зависимости от выбранного вами курса. В большинстве случаев тематику проекта вы согласовываете с преподавателем в индивидуальном порядке, потому можете не сомневаться, что ваша работа будет уникальна."
//       },]
//   },
// ]

const QUESTIONS = [
  {
    title: "Индивидуальные занятия с репетитором",
    questions: [{
        userName:"wf",
        adminName:"rjkegkql",
        question:"Что нужно для начала занятий?",
        answer:"Для большинства дисциплин начальных знаний не требуется. Чтобы заключить договор достаточно сообщить номер телефона и имя студента. Вы можете это сделать как по телефону, так и лично, приехав к нам в офис."
        },
        {
          userName:"wf",
          adminName:"rjkegkql",
          question:"На какой возраст расчитаны занятия?",
          answer:"Преподаватель подстроится почти под любой возраст, однако большинство программ расчитаны на студентов от 12 лет. Как показывает практика, это минимальный рекомендуемый возраст для прохождения программы. Однако мы советуем также принимать во внимание и личностные качества студента."
          },
          {
            userName:"wf",
            adminName:"rjkegkql",
            question:"Когда начинается набор в группу?",
            answer:'IT GO набирает группы несколько раз в год. Если вы не попали в поток, вы можете обратить внимание на индивидуальные занятия - мы стараемся поддерживать доступные цены.'
          },
          {
            userName:"",
            adminName:"",
            question:"На каком языке ведётся обучение?",
            answer:"На данный момент обучение предусмотрено только на русском языке"
            },
      ]
  },
  {
    title: "Оплата",
    questions: [{
      userName:"ewgwg",
      adminName:"gewgwe",
      question:"Как происходит оплата?",
      answer:"Оплата производится наличными в офисе, банковским переводом или через систему Click или PayMe. Вы можете вносить предоплату ежемесячно, за каждое занятие или договориться с репетитором об удобном вам формате оплаты."
      },
      {
      userName:"",
      adminName:"",
      question:"Мы пропустили урок. Будут ли за него списаны деньги?",
      answer:"В случае если вы записаны на индивидуальные занятия - нет. Вы платите репетитору только за отработанные часы, и тем не менее мы настоятельно рекомендуем предупреждать преподавателя об отмене занятий по крайней мере за 2 часа."
      },{
      userName:"",
      adminName:"",
      question:"Мы передумали, можем ли мы вернуть деньги?",
      answer:"Конечно! В любой момент вы можете вернуть остаток средств за все оставшиеся занятия. Обратите внимание, что в целях безопасности мы можем запросить документ, удостоверяющий личность (мы должны убедиться, что возвращаем деньги именно Вам). Начисленные бонусы не могут быть конвертированы в валюту и возврату не подлежат."
      },]
  },
  {
    title: "Процесс обучения",
    questions: [{
      userName:"ewgwg",
      adminName:"gewgwe",
      question:"Как будут проходить занятия?",
      answer:"Длительность индивидуальных занятий определяется договорённостями и потребностями самого студента. Однако, как показывает практика, оптимальое время занятий для детей до 14 лет - не более часа. Для детей старше и взрослых мы рекомендуем занятия длительностью не менее полутора часов."
      },
      {
      userName:"",
      adminName:"",
      question:"Будут ли задания на дом?",
      answer:"Да, но перегружать студентов - не наша политика. В качестве домашнего задания мы выдаём лишь необходимый минимум, расчитанный на 30-40 минут работы. Однако если студент почувствует необходимость, наша онлайн-платформа обладает огромной базой заданий различной степени сложности. Задания проверяются автоматически - студент сразу получит результат своей работы!"
      },{
      userName:"",
      adminName:"",
      question:"Могу ли я контролировать обучение своего ребёнка?",
      answer:"Конечно! У каждого студента имеется электронный дневник, в котором проставляется информация о посещённых занятиях, назначенных и выполненных заданяих а также отметках, полученных в ходе урока."
      },
      
    
    ]
  },
  {
    title: "Что далее?",
    questions: [{
      userName:"32",
      adminName:"424",
      question:"Смогу ли я стать программистом / Web-разработчиком / 3d дизайнером?",
      answer:"Да, конечно! Вам стоит сразу сообщить репетитору о ваших целях, и они будут достигнуты вне зависимости от трудности поставленной вами задачи."
      },
      {
      userName:"sdav",
      adminName:"lkrgq",
      question:"Будет ли у меня портфолио?",
      answer:"Конечно! Вы сможете пополнить ваше портфолио одним или несколькими проектами в зависимости от ваших возможностей и желаний. В большинстве случаев тематику проектов вы согласовываете с преподавателем в индивидуальном порядке, потому можете не сомневаться, что ваша работа будет уникальна."
      },]
  },
]

export default function Grade () {

  window.scroll(0,0);

// ACCORDEON
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
// ACCORDEON

return(
  <div style={{backgroundColor:"rgb(241, 244, 247)"}}>
    <div className={css.head_setting} >
      <Header />
    </div>

    <div style={{margin:'auto', maxWidth:'1100px'}}>
      <h1 className={css.title}>В этом разделе мы собрали самые частые вопросы</h1>
      <Box style={{ backgroundColor: 'rgb(216, 222, 236)', padding:'30px', margin:'40px', width: 'calc(100% - 140px)', lineHeight:2, fontSize:'20px'}}>
      Нет времени разбираться? Просто позвоните нам и получите ответы на все интересующие вопросы!<br/>
      Номер для связи: <a href="tel:+998333224855">+998 (33) 322-48-55</a>
    </Box>
        {QUESTIONS.map(el=>{return(
            <div className={css.accordeon}>
              <Accordion expanded={expanded === el.title} onChange={handleChange(el.title)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ flexShrink: 0 }} className={css.accordeon__title}>{el.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                  {el.questions.map(underEl=>{return(
                  <div className={css.question}>
                    <div >
                      <div style={{marginBottom:"20px"}}><b>{underEl.question}</b></div>
                      <div style={{fontWeight:'300'}}>{underEl.answer}</div>
                    </div>
                  </div>
                )})}
                  </Typography>
                </AccordionDetails>
              </Accordion>

            </div>
        )})}

    </div>
    <div style={{backgroundImage:`url(${pic11})`, backgroundSize:"cover", paddingTop:'1px', backgroundPosition:'center', marginTop:'80px'}}>
      <Map />
      <Footer/>
    </div>
  </div>
)
}