
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllNotes from './Components/AllNotes';
import NotesForm from './Components/NotesForm';
import NavBar from './Components/NavBar'

import { useState } from 'react';



function App() {

  const [mode,setMode]=useState('dark')

  const toggleMode=()=>{
    if(mode==='light')
    {
      setMode('dark')
      document.body.style.backgroundColor='#30353b'
    }
    else
    {
      setMode('light')
      document.body.style.backgroundColor='#d8e2ee'
    }
  }


  return (
    <div className="App">
          
      <BrowserRouter>
      <NavBar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path='/' element={<NotesForm mode={mode} />} />
          <Route path='/allNotes' element={<AllNotes mode={mode} />} />
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
