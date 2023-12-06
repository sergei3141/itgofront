import { Route, Routes } from 'react-router-dom';
import Code from './Codeeditor/components/Landing'
import Login from './Login/Login'
import Teacher from './Teacher/Teacher'
import Landing from './Landing/Landing'
import Students from './Students/Students'
import Grade from './Grade/Grade'
import Tables from './Table/Table'
import Admin from './Admin/Admin'
import Courses from './Courses/Courses'
import Clients from './Clients/Clients'
import Content from './Content/Content'
import './App.css';
import { useState, useEffect } from 'react';
import { getAdress } from './API/API';

function App() {

  const [adress, setAdress] = useState([])

  useEffect(()=>{
    getAdress().then((data)=>{
      setAdress(data.data[0])
    })
  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing adress={adress}/>}></Route>
        <Route path="/Students" element={<Students />}></Route>
        <Route path="/Codewings" element={<Code />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Teacher" element={<Teacher />}></Route>
        <Route path="/Grade" element={<Grade />}></Route>
        <Route path="/Table" element={<Tables />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Courses" element={<Courses />}></Route>
        <Route path="/Clients" element={<Clients />}></Route>
        <Route path="/Content" element={<Content />}></Route>
      </Routes>
    </div>
  );
}

export default App;
