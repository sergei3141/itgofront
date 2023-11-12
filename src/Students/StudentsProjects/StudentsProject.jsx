import { useEffect } from 'react';
import css from './styles.css'
import { Icon as iconify} from '@iconify/react';
//const iconify = icon;

function StudentsProject() {


  const toDoList=[
    {
        "id":1,
        "deg":2,
        "color":"93e684",
        "text": "Let's do something awesome!",
        "position":{"x":20, y:210}
    }, 
    {
        "id":2,
        "deg":-7,
        "color":"e6ce84",
        "text": "It's my first project!",
        "position":{"x":20, y:400}
    },
    
    ]

const colors = ['e6ce84', '93e684', 'e68b84', '84e6dc', '84a3e6', 'ba84e6', 'e684d7', 'e68484', '#79c4e0', '#7c71ef']

let currentId;                      //Позволяет отслеживать id последней зажатой бумажки
let mouseDown = false;
let mouseMoveStartX
let mouseMoveStartY                 //Считывает пройденное мышью расстояние во время перетаскивания
let marginTop;                      //Считывает отступы элемента во время нажатия для перетаскивания
let marginLeft;
let zIndex = toDoList.length + 1    //Назначает z-index всё больший для тронутых или вновь созданных элементов

function toDoListRender(toDoList){
    
    //Рандомайзер поворачивает бумажки на определённый угол
    function takeRandomDeg(){
        return (Math.random()-0.5)*20
    }

    //Рандомайзер выдаёт числа от 0 до 9, чтобы по ним обратиться к массиву colors за выбором случайного числа
    function takeRandomColor(){
        return Math.floor(Math.random()*10)

    }
    //Рандомайзер выдаёт (почти) уникальный набор цифр для каждой бумажки
    const id = Math.random()
    toDoList.map((el)=>{
        
        let note = document.createElement('div')
        note.className = "note"
        note.id = el.id || id

        note.style=`rotate: ${el?.deg || takeRandomDeg()}deg; 
                    z-index: ${zIndex};
                    background-color: #${el?.color || colors[takeRandomColor()]}; 
                    top:${el?.position?.y || window.innerHeight/2-140}px; 
                    left:${el?.position?.x || window.innerWidth/4-140}px`
                    zIndex++;

        note.innerHTML =`
            <div class="note__menu" style="font-size:1px">
                <iconify icon="carbon:move" width="14" height="14" class="note__icon" />
                <iconify icon="iconoir:delete-circle" width="14" height="14" class="note__icon" onClick={deleteNote(${el.id || id})} >
            </div>
            <textarea class="create-note__input-text" spellcheck="false">${el.text || ""}</textarea>`

        note.onmousedown = function(e) {
            mouseDown = true;
            currentId = el.id || id;
            document.getElementById(currentId).style.zIndex = zIndex;
            zIndex++;       //Переназначает Z-index любому тронотуму элементу, чтобы он всегда был поверх
            mouseMoveStartX = e.x
            mouseMoveStartY = e.y
            marginTop = +getComputedStyle(document.getElementById(currentId)).top.replace(/px/g, '')    
            marginLeft = +getComputedStyle(document.getElementById(currentId)).left.replace(/px/g, '')
        }
        document.onmouseup = function(e) {
            mouseDown = false
        }
        document.onmousemove = function(e) {
            if(mouseDown){
                document.getElementById(currentId).style.top = marginTop - mouseMoveStartY + e.clientY + "px"
                document.getElementById(currentId).style.left = marginLeft - mouseMoveStartX + e.clientX + "px"
        }
        }
        //document.getElementById('body').appendChild(note)
    })
}
useEffect(()=>{
    toDoListRender(toDoList)
},[])

function createNewNote(){
    toDoListRender([''])    //Передаём массив с ненужным элементом, чтобы map сработал и не найдя свойств .deg .color .text и тд создал новый элемент
}



function deleteNote(id){
    document.getElementById(id).remove()
}


  return (
      <div id="body" style={{width:"50%"}}>
        <button onClick={createNewNote}>Create note</button>
      </div>
  )
}

export default StudentsProject