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

import EditorTerminal from "@monaco-editor/react";

import Header from '../../Header/HeaderCodewings'
import exercise from "./Tasks";
import {authMe, changeUsersTask} from "../../API/API"


const Landing = () => {

  useEffect(()=>{
    authMe().then((data)=>{

      //Получаем выполненные задания и сортируем, чтобы они были по порядку
      let a = data?.tasks_completed?.split(',')
      a = [... new Set(a)]
      a?.sort(function(a, b) { return a - b;});
      a = a?.join(',')

      setTasksCompleted(a || 0);
      setUsersId(data.id)
    })
  },[])

  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [usersId, setUsersId] = useState(0);

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
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  function testing (response){
    let resultArray = atob(response.stdout).split('\n')
    resultArray.pop()
    debugger
    if (JSON.stringify(resultArray)==JSON.stringify(exerciseTestKeys)){
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
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
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
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
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
    options: exercise,
    getOptionLabel: (option) => option.id,
  }

  function changeTask () {
    setTimeout(()=>{
      setCurrentTaskId(document.getElementById('taskId').value)
      setExerciseText(exercise[document.getElementById('taskId').value].description)
      setExerciseTest(exercise[document.getElementById('taskId').value].tests)
      setExerciseTestKeys(exercise[document.getElementById('taskId').value].testKeys)
    },0)


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
                  onChange={()=>{changeTask()}}
                  {...defaultProps}
                  disablePortal
                  id="taskId"
                  options={exercise}
                  sx={{ width: 'calc(100% - 10px)' }}
                  renderInput={(params) => <TextField  style={{backgroundColor:'grey', margin:'6px'}} {...params} label="Task number" />}
                />
                {/* <Button style={{backgroundColor:'rgba(120,120,120,0.7)', height:'30px', borderRadius:'2px', cursor:'pointer', color:'white', marginBottom:'5px'}} class={'monaco-editor no-user-select mac  showUnused showDeprecated vs-dark'}>Следующая</Button> */}
              </div>
              <div style={{width:'calc(100% - 4px - 20px)', height:'calc(69vh - 50px)', border:'0px solid red', resize:'none', fontFamily:'monospace', fontSize:'10px', padding:'10px'}} class={'monaco-editor no-user-select mac  showUnused showDeprecated vs-dark'}>
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
      {tasksCompleted}
    </div>
  );
};
export default Landing;


