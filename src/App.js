
import React, {useMemo} from "react";
import './style.css'
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes, Link, HashRouter} from "react-router-dom";
import HeaderApp from "./components/HeaderApp";
import FooterApp from "./components/FooterApp";
import SuccessPage from "./pages/SuccessPage";
import Task_6 from "./pages/Task_6";
import Task_7 from "./pages/Task_7";
import Task_8 from "./pages/Task_8";
import TaskList from "./pages/TaskList";
import {useState} from "react";

function App() {
    let defValue = localStorage.getItem('countSuccessAnswer') ? parseInt(localStorage.getItem('countSuccessAnswer')) : 0;
    let [successCount, setSuccessCount] = useState(defValue);

    useMemo(() => {
        localStorage.setItem('countSuccessAnswer', successCount.toString());
    }, [successCount]);

  return (
      <div className='flex-container'>
          <HeaderApp count={successCount} functionCount={setSuccessCount}/>
          <main className='main'>
              <HashRouter>
                  <Routes>
                      <Route index  path="/" element={<Home/>}/>
                      <Route exact index  path="/task/6" element={<Task_6 functionCount={setSuccessCount}/>}/>
                      <Route exact index  path="/task/7" element={<Task_7 functionCount={setSuccessCount}/>}/>
                      <Route exact index  path="/task/8" element={<Task_8 functionCount={setSuccessCount}/>}/>
                      <Route exact index  path="/task/" element={<TaskList/>}/>
                      <Route index  path="/SuccessPage" element={<SuccessPage/>}/>
                  </Routes>
              </HashRouter>
          </main>
          <FooterApp/>
      </div>
  );
}

export default App;
