
import React from "react";
import './style.css'
import Home from "./pages/Home";
import {BrowserRouter , Route, Routes, Link} from "react-router-dom";
import HeaderApp from "./components/HeaderApp";
import FooterApp from "./components/FooterApp";
import SuccessPage from "./pages/SuccessPage";
import Task_6 from "./pages/Task_6";
import Task_7 from "./pages/Task_7";
import Task_8 from "./pages/Task_8";
import Task_9 from "./pages/Task_9";
import TaskList from "./pages/TaskList";

function App() {
  return (
      <div className='flex-container'>
          <HeaderApp/>
          <main className='main'>
              <BrowserRouter>
                  <Routes>
                      <Route index  path="/" element={<Home/>}/>
                      <Route exact index  path="/task/6" element={<Task_6/>}/>
                      <Route exact index  path="/task/7" element={<Task_7/>}/>
                      <Route exact index  path="/task/8" element={<Task_8/>}/>
                      <Route exact index  path="/task/9" element={<Task_9/>}/>
                      <Route exact index  path="/task" element={<TaskList/>}/>
                      <Route index  path="/SuccessPage" element={<SuccessPage/>}/>
                  </Routes>
              </BrowserRouter>
          </main>
          <FooterApp/>
      </div>
  );
}

export default App;
