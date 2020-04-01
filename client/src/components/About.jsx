import React from 'react';
import travel from '../img/travel.jpg'

function About(props) {

    return (
        <div className='about'>
            <h1>Write your thoughts, keep them safe!</h1>
            <p>Write your diary, organize, safe, nice and for free.</p>
            <img className='about-travel' src={travel} alt="travel" />
        </div>

    )
}

export default About;