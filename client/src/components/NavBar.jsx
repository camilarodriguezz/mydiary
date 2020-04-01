import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router'
import axios from 'axios'
import logo from '../img/blogtime.png'
import gif from '../img/hour_glass.gif'

function NavBar(props) {
    const [userState, setUserState] = useState({})
    const [error, setError] = useState("")
    const [refresher, setRefresher] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId') === null) {
            navigate('/')
        } else {
            axios.get(`http://localhost:8000/api/v1/readOne/${localStorage.getItem('userId')}`, { withCredentials: true })
                .then(response => {
                    // console.log('the response navbar',response)
                    setUserState(response.data)
                })
                .catch(error => {
                    console.log(error)
                    setUserState({})
                    setError("Please login to display data")
                })
        }

    }, [refresher])

    console.log('props navbar', props)
    const toRegister = (e) => {
        const anchor = document.querySelector('#register')
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    const toLogin = (e) => {
        const anchor = document.querySelector('#login')
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    
    const toDashboard = (e) => {
        navigate('/dashboard')
    }
    const toProfile = (e) => {
        navigate('/userupdate')
    }
    const toLogout = (e) => {
        axios.get('http://localhost:8000/api/v1/logout', { withCredentials: true })
            .then(response => {
                setRefresher(!refresher)
                localStorage.clear();
                navigate('/')
            })
            .catch(error => console.log(error))
    }
    // console.log('staetttete', userState)

    return (
        <div className='nav_bar'>
            <img className='nav_bar-gif' src={gif} alt="hour glass gif" />
            <img className='nav_bar-logo' src={logo} alt="blogtime logo" />
            {props.path === '/' ?
                <div>
                    <button onClick={toRegister} className='regis'>Register</button>
                    <button onClick={toLogin} className='login'>Login</button>
                </div>
                :
                <div>
                    {props.path !== '/userupdate' ?
                        <div>
                            <button onClick={toProfile} className='regis'>{userState.firstName} Profile</button>
                            <button onClick={toLogout} className='login'>Logout</button>
                        </div>
                        :
                        <div>
                            <button onClick={toDashboard} className='regis'>Home</button>
                            <button onClick={toLogout} className='login'>Logout</button>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default NavBar;