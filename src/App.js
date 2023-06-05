
import React from "react";
import './style.css'
import Home from "./pages/Home";
import {BrowserRouter , Route, Routes, Link} from "react-router-dom";
import HeaderApp from "./components/HeaderApp";
import FooterApp from "./components/FooterApp";
import Task from "./pages/Task";

function App() {
  return (
      <div className='flex-container'>
          <HeaderApp/>
          <main className='main'>
              <BrowserRouter>
                  <Routes>
                      <Route index  path="/" element={<Home/>}/>
                      <Route index  path="/task_6" element={<Task/>}/>
                  </Routes>
              </BrowserRouter>
          </main>
          <FooterApp/>
      </div>
  );
}

export default App;
