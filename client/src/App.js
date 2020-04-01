import React from 'react';
import { Router } from '@reach/router'
import MainPage from './components/MainPage';
import UserRegis from './components/UserRegis';
import UserLogin from './components/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import BlogForm from './components/BlogForm';
import UserUpdate from './components/UserUpdate';

function App() {
  return (
    <div >
      <Router>
        <MainPage path='/' />
        <Dashboard path='/dashboard'/>
        <BlogForm path='/createblog'/>
        <UserUpdate path='/userupdate'/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
