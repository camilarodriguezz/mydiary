import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import book from '../img/book.jpg'
import privacy from '../img/privacy.jpg'
import music from '../img/music.jpg'

function UserRegis(props) {
    const [registerState, setRegisterState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errorState, setErrorState] = useState([])

    const onChangeHandler = (e) => {
        setRegisterState({
            ...registerState, [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v1/create', registerState, {withCredentials:true})
            .then(res => {
                if (res.data.errors) {
                    setErrorState({
                        firstName: res.data.errors.firstName ? res.data.errors.firstName.message : '',
                        lastName: res.data.errors.lastName ? res.data.errors.lastName.message : '',
                        email: res.data.errors.email ? res.data.errors.email.message : '',
                        password: res.data.errors.password ? res.data.errors.password.message : '',
                        confirmPassword: res.data.errors.confirmPassword ? res.data.errors.confirmPassword.message : '',
                    })
                } else if(res.data.msg === "Email already exists") {
                    console.log(res.data.msg)
                    setErrorState({
                        email:'A user with this email is already register.',
                    })
                } else {
                    localStorage.setItem('userId', res.data._id)
                    console.log('registration Succsesful');
                    navigate('/dashboard')
                }
            })
            .catch(err => { console.log(err)
            })
    }

    return (
        <div className='register' id='register'>
            <div>
                <h2>Register to start:</h2>
                <form onSubmit={onSubmitHandler}>
                    <label>First Name:</label>
                    {errorState.firstName !== '' ? <p className='errors'>{errorState.firstName}</p> : null}
                    <input type='text' name='firstName' value={registerState.firstName} onChange={onChangeHandler} />
                    <label>Last Name:</label>
                    {errorState.lastName !== '' ? <p className='errors'>{errorState.lastName}</p> : null}
                    <input type='text' name='lastName' value={registerState.lastName} onChange={onChangeHandler} />
                    <label>Email:</label>
                    {errorState.email !== '' ? <p className='errors'>{errorState.email}</p> : null}
                    <input type='email' name='email' value={registerState.email} onChange={onChangeHandler} />
                    <label>Password:</label>
                    {errorState.password !== '' ? <p className='errors'>{errorState.password}</p> : null}
                    <input type='password' name='password' value={registerState.password} onChange={onChangeHandler} />
                    <label>Confirm Password:</label>
                    {errorState.confirmPassword !== '' ? <p className='errors'>{errorState.confirmPassword}</p> : null}
                    <input type='password' name='confirmPassword' value={registerState.confirmPassword} onChange={onChangeHandler} />
                    <button className='regis-btn' type='submit'>Register</button>
                </form>
                <img className='regis-book' src={book} alt="book" />
                <img className='regis-cook' src={privacy} alt="privacy" />
                <img className='regis-music' src={music} alt="music" />
            </div>

        </div>
    )
}

export default UserRegis;