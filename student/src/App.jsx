import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Student from './components/Student';
import Subjects from './components/Subjects';
import Result from './components/Result';
import Departments from './components/Departments';
import StudentForm from './components/StudentForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddDepartment from './components/AddDepartment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard /> } > 
        <Route path='' element={<Home />}> </Route>
          <Route path='/dashboard/student' element={<Student />} ></Route>
          <Route path='/dashboard/subjects' element={<Subjects />} ></Route>
          <Route path='/dashboard/result' element={< StudentForm />} ></Route>
          <Route path='/dashboard/departments' element={<Departments />} ></Route>
          <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
          </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
