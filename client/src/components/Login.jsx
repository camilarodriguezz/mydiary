import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

function UserLogin(props) {
    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
    });

    const [errorState, setErrorState] = useState([])

    const onChangeHandler = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v1/login', loginState, { withCredentials: true })
            .then(res => {
                // console.log('is this one?',res);
                if (res.data.errors) {
                    setErrorState({
                        email: res.data.errors.email ? res.data.errors.email.message : '',
                        password: res.data.errors.password ? res.data.errors.password.message : '',
                 }) 
                } else if (res.data.msg !== 'success') {
                    console.log(res.data.msg)
                    setErrorState({
                        email: "This email doesn't exist or password is incorect",
                 }) 
                    
                } else {
                    localStorage.setItem('userId', res.data._id)
                    console.log(localStorage.getItem('userId'));
                    console.log('login succsesful');
                    navigate('/dashboard')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='login_form' id='login'>
            <div>
                <h2>Login to create new entries:</h2>
                <form onSubmit={onSubmitHandler}>
                    <label>Email: </label>
                    <input type='email' name='email' value={loginState.email} onChange={onChangeHandler} />
                    <label>Password: </label>
                    <input type='password' name='password' value={loginState.password} onChange={onChangeHandler} />
                    <button type='submit'>Login</button>
                </form>
                {errorState.email !== '' ? <p className='errors'>{errorState.email}</p> : null}
            </div>
        </div>
    )
}

export default UserLogin;