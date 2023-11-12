import { Route, Routes } from 'react-router-dom';
import Code from './Codeeditor/components/Landing'


import Landing from './Landing/Landing'
import Students from './Students/Students'
import Header from './Header/Header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/Students" element={<Students />}></Route>
        <Route path="/Code" element={<Code />}></Route>
      </Routes>
    </div>
  );
}

export default App;
