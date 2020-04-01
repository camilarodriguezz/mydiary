import React from 'react';
import NavBar from './NavBar';
import About from './About';
import UserRegis from './UserRegis';
import UserLogin from './Login';
import Footer from './Footer';

function MainPage() {
    return (
        <div >
            <NavBar path='/' />
            <About />
            <UserRegis />
            <UserLogin />
        </div>
    );
}

export default MainPage;