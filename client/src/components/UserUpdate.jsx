import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import NavBar from './NavBar';

function UserUpdate(props) {
    const [userState, setUserState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errorState, setErrorState] = useState('')
    const [refreshState, setRefreshState] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId') === null) {
            navigate('/')
        } else {
            axios.get(`http://localhost:8000/api/v1/readOne/${localStorage.getItem('userId')}`, { withCredentials: true })
                .then(res => {
                    console.log(res)
                    setUserState(res.data) 
                })
                .catch(error => {
                    console.log(error)
                    setUserState({})
                    setErrorState("Please login to display data")
                })
        }
    }, [refreshState])

    const onChangeHandler = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let temp = { ...userState };
        console.log('temptemp', temp)
        axios.put(`http://localhost:8000/api/v1/updateProfile/${localStorage.getItem('userId')}`, temp, { withCredentials: true })
            .then(res => {
                if (res.data.errors) {
                    setErrorState({
                        firstName: res.data.errors.firstName ? res.data.errors.firstName.message : '',
                        lastName: res.data.errors.lastName ? res.data.errors.lastName.message : '',
                        email: res.data.errors.email ? res.data.errors.email.message : '',
                        password: res.data.errors.password ? res.data.errors.password.message : '',
                        confirmPassword: res.data.errors.confirmPassword ? res.data.errors.confirmPassword.message : '',
                    })
                } else {
                    console.log('successfully updated!');
                    alert('Profile updated succesfully')
                    navigate('/dashboard')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/v1/deleteOne/${localStorage.getItem('userId')}` , { withCredentials: true})
            .then(res => {
                console.log(res)
                console.log('user has been deleted');
                localStorage.clear();
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <NavBar path='/userupdate' />
            <div className='register updateuser'>
                <div>
                    <h2>Update your profile:</h2>
                    <form onSubmit={onSubmitHandler}>
                        <label>First Name:</label>
                        {errorState.firstName !== '' ? <p className='errors'>{errorState.firstName}</p> : null}
                        <input type='text' name='firstName' value={userState.firstName} onChange={onChangeHandler} />
                        <label>Last Name:</label>
                        {errorState.lastName !== '' ? <p className='errors'>{errorState.lastName}</p> : null}
                        <input type='text' name='lastName' value={userState.lastName} onChange={onChangeHandler} />
                        <label>Email:</label>
                        {errorState.email !== '' ? <p className='errors'>{errorState.email}</p> : null}
                        <input type='email' name='email' value={userState.email} onChange={onChangeHandler} />
                        <label>Password:</label>
                        {errorState.password !== '' ? <p className='errors'>{errorState.password}</p> : null}
                        <input type='password' name='password' onChange={onChangeHandler} />
                        <label>Confirm Password:</label>
                        {errorState.confirmPassword !== '' ? <p className='errors'>{errorState.confirmPassword}</p> : null}
                        <input type='password' name='confirmPassword' onChange={onChangeHandler} />
                        <button className='upd-btn' type='submit'>Update</button>
                    </form>
                    <button onClick={handleDelete} className='dlte-acct'>Delete your account</button>
                </div>
            </div>
        </div>
    )
}

export default UserUpdate;