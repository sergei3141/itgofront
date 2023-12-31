//https://rapidapi.com/judge0-official/api/judge0-ce
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import {Button} from 'antd'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import css from '../../Teacher//Teacher.module.css'

import EditorTerminal from "@monaco-editor/react";

import Header from '../../Header/HeaderCodewings'
//import exercise from "./Tasks";
import {authMe, changeUsersTask, getExerciseById} from "../../API/API"
import { useLocation } from "react-router-dom";
import { getAllExercises } from "../../API/API";

const Landing = () => {
  const location = useLocation();
  const { state } = location;
  const [exerciseS, setExercisesS] = React.useState('')

  useEffect(()=>{
    authMe().then((data)=>{

      //Получаем выполненные задания и сортируем, чтобы они были по порядку
      let a = data?.tasks_completed?.split(',')
      a = [... new Set(a)]
      a?.sort(function(a, b) { return a - b;});
      a = a?.join(',')

      setTasksCompleted(a || 1);
      setUsersId(data.id)
    })

    getAllExercises().then((data)=>{
      setExercisesS(data.data)

      
      let id = state?.from?.el || 1
      for (let i = 0; i <= data.data.length; i++){
        if (data.data.length > 0){
          if (id == data.data[i]?.number){
            setCurrentExercise(data.data[i])
            setCurrentTaskId(id)
            setExerciseText(data.data[i].description)
            setExerciseTest(data.data[i].tests)
            setExerciseTestKeys(data.data[i].testKeys)
            }
          }
        }
      changeTask()
      setLoading(false)

    })

    let id = state?.from?.el || 1

    for (let i = 0; i <= exerciseS.length; i++){
      if (exerciseS.length > 0){
        if (id == exerciseS[i]?.number){
          setCurrentExercise(exerciseS[i])
          setCurrentTaskId(id)
          setExerciseText(exerciseS[i].description)
          setExerciseTest(exerciseS[i].tests)
          setExerciseTestKeys(exerciseS[i].testKeys)
          }
        }
      }
    changeTask()

  },[])

  // let id = state?.from?.el || 1

  // for (let i = 0; i <= exerciseS.length; i++){
  //   if (exerciseS.length > 0){
  //     if (id == exerciseS[i]?.number){
  //       setCurrentExercise(exerciseS[i])
  //       setCurrentTaskId(id)
  //       setExerciseText(exerciseS[i].description)
  //       setExerciseTest(exerciseS[i].tests)
  //       setExerciseTestKeys(exerciseS[i].testKeys)
  //       }
  //     }
  //   }
  // changeTask()

  const [currentExercise, setCurrentExercise] = useState()
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [usersId, setUsersId] = useState(0);
  const [loading, setLoading] = useState(true);

  const [exerciseText, setExerciseText] = useState()
  const [exerciseTest, setExerciseTest] = useState()
  const [exerciseTestKeys, setExerciseTestKeys] = useState()

  const [code, setCode] = useState(exerciseText);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  function testing (response){
    let result = atob(response.stdout)
    result = result.replace(/[^\w!?,.-]/g,'')
    let keys = exerciseTestKeys.split(',').join('')
    if (result===keys){
      showSuccessToast(`Тесты пройдены!`);
      //POST here new tast completed Здесь мы постим и проверяем, чтобы масисв был уникален
      let obj = new FormData()
      let a = (tasksCompleted + ',' + currentTaskId).split(',')
      a = [... new Set(a)]
      a = a?.join(',')
      setTasksCompleted(a)
      obj.append('tasks_completed', a)
      changeUsersTask(obj, usersId).then((data)=>{
      })
      
    } else {
      showErrorToast('Тест не пройден :(');
    }
  }

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    let codeWithTests = code + exerciseTest
    setProcessing(true);
    console.log(code);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(codeWithTests),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: 'https://it-go-server.ru/submissions',
      //url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "multipart/form-data; boundary=<calculated when request is sent>",
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        "X-RapidAPI-Host": 'it-go-server.ru',
        //"X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
        "X-RapidAPI-Key": '73e640b27bmshf1bd46436c43d13p15e93bjsn744af366900f',
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: 'https://it-go-server.ru/submissions'  + "/" + token,
      //url: 'https://judge0-ce.p.rapidapi.com/submissions' + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
       headers: {
        "X-RapidAPI-Host": 'it-go-server.ru',
         //"X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
         "X-RapidAPI-Key": '73e640b27bmshf1bd46436c43d13p15e93bjsn744af366900f',
       },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);

        //console.log("response.data", response.data);
        testing(response.data)
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const defaultProps = {
    options: {exerciseS},
    getOptionLabel: (option) => option.number,
  }

  function changeTask () {
    let id = document.getElementById('taskId').value || 1
    if(exerciseS.length > 0){
      for (let i = 0; i < exerciseS.length; i++){
        if (id == exerciseS[i].number){
          setCurrentExercise(exerciseS[i])
          setCurrentTaskId(id)
          setExerciseText(exerciseS[i].description)
          setExerciseTest(exerciseS[i].tests)
          setExerciseTestKeys(exerciseS[i].testKeys)
        }
      }
    }







  }

  return (
    <div class={'monaco-editor no-user-select mac  showUnused showDeprecated vs-dark'} style={{paddingBottom:'60px'}}>
      <Header/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
<div style={{height:'20px'}}></div>
      <div style={{margin:'auto', width:'90%', boxShadow:  '0 0 0 3px rgba(120,120,120,0.3)'}}>
        <div >
          <div style={{ display:'flex' }}>
            <div style={{width:'40%', display:'block', boxShadow:  '0 0 0 3px rgba(120,120,120,0.4)', margin:'2px'}}>
              {/* <CodeEditorWindow 
                onChange={()=>{}}
                code={code}
                theme={theme.value}
                options={{
                  minimap: {
                    enabled: false,
                  },
            }}
              /> */}
              <div style={{borderBottom:'2px rgba(120,120,120,0.7) solid', display:'flex', justifyContent:'space-between', alignItems:'center', padding:"0px 10px"}} >

                <Autocomplete
                  disabled={loading}
                  onChange={()=>{setTimeout(()=>{changeTask()}, 0)}}
                  {...defaultProps}
                  disablePortal
                  id="taskId"
                  defaultValue={{number: state?.from?.el || 1}}
                  options={exerciseS}
                  sx={{ width: 'calc(100% - 10px)' }}
                  renderInput={(params) => <TextField  style={{backgroundColor:'grey', margin:'6px'}} {...params} label="Task number" />}
                />
                {/* <Button style={{backgroundColor:'rgba(120,120,120,0.7)', height:'30px', borderRadius:'2px', cursor:'pointer', color:'white', marginBottom:'5px'}} class={'monaco-editor no-user-select mac  showUnused showDeprecated vs-dark'}>Следующая</Button> */}
              </div>
              <div style={{width:'calc(100% - 4px - 20px)', height:'calc(69vh - 50px)', border:'0px solid red', resize:'none', fontFamily:'monospace', fontSize:'10px', padding:'10px', fontSize:'15px'}} class={'monaco-editor no-user-select mac  showUnused showDeprecated vs-dark'}>
                {exerciseText}
              </div>
            </div>
            <div style={{width:'60%', display:'block', boxShadow:  '0 0 0 3px rgba(120,120,120,0.4)', margin:'2px'}}>
                <CodeEditorWindow
                language={language?.value}
                theme={theme.value}
                onChange={onChange}
                />
          <div style={{display:'flex', justifyContent:'space-between', padding:'0px 10px 4px 10px' }} > {/*2px rgba(120,120,120,0.7) solid*/ }
              <div style={{display:'flex'}}>
              <div style={{marginRight:'5px'}}>
                <LanguagesDropdown onSelectChange={onSelectChange} />
              </div>
              <div>
                <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
              </div>
            </div>
            <Button type="primary" style={{backgroundColor: 'palegreen', color: 'rgb(100, 34, 161)', width: '200px', opacity:0.7, height: '38px', marginTop:'0px'}} onClick={handleCompile} >
                  {processing ? "Processing..." : "Compile and Execute"}
            </Button>
          </div>

            </div>
          </div>
        </div>
        <div style={{width:'calc(100% - 4px)', display:'block', margin:'auto', boxShadow:  '0 0 0 3px rgba(120,120,120,0.4)', margin:'2px'}}>
        {/* <EditorTerminal
        height="15vh"
        width={`100%`}
        language={language || "javascript"}
        theme={theme.value}
        
        code={outputDetails}
        onChange={()=>{}}
        options={{
          minimap: {
            enabled: false,
          },
    }}
      /> */}
        </div>
        <div style={{textAlign: 'start', padding:"20px", minHeight:'140px'}}>
          <div style={{marginTop: "-15px", fontFamily:"monospace", backgroundColor:"rgba(179,179,179,0.2)", display:'flex', justifyContent:'space-between'}}>
            <div>Результат компиляции:</div>
            <div>v 1.0.0</div>
            </div>
          <OutputWindow outputDetails={outputDetails } 
          //  code={"outputDetails"}
          />
          <div className="flex flex-col items-end">
            {/* <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            /> */}

          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <div style={{marginTop:'20px', marginBottom:'8px'}}>Выполненные задания:</div>
      <div style={{display:'flex', flexWrap:'wrap', margin:'auto', maxWidth:'1250px'}}>{tasksCompleted ? tasksCompleted.split(',').map((el)=>{return(<div className={css.tasks__cell} style={{color: 'black', opacity:0.6}}>{el}</div>)}) : <div></div>}</div>
    </div>
  );
};
export default Landing;


