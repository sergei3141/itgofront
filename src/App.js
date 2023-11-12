import { Route, Routes } from 'react-router-dom';
import Code from './Codeeditor/components/Landing'
import Login from './Login/Login'
import Teacher from './Teacher/Teacher'
import Landing from './Landing/Landing'
import Students from './Students/Students'
import Grade from './Grade/Grade'
import Tables from './Table/Table'
import Admin from './Admin/Admin'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/Students" element={<Students />}></Route>
        <Route path="/Codewings" element={<Code />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Teacher" element={<Teacher />}></Route>
        <Route path="/Grade" element={<Grade />}></Route>
        <Route path="/Table" element={<Tables />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
