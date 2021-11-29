import React from 'react';
import ReactDOM from 'react-dom';
import { Routes , Route, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import AdminLogin from './screens/AdminLogin';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import UserProfileUpdate from './screens/userProfileUpdate';
import './utils/global.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path='/admin' element={<AdminLogin/>}>
      </Route>
      <Route exact path='login' element={<Login/>}>
      </Route>
      <Route exact path='register' element={<Register/>}>
      </Route>
      <Route exact path='register/user-profile' element={<UserProfileUpdate/>}>
      </Route>
      <Route exact path='/' element={<Home/>}>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();