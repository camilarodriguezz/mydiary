import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import NavBar from './NavBar';

function BlogForm(props) {
    const [userState, setUserState] = useState({})
    console.log('userstate crete blog', userState)
    const [formState, setFormState] = useState({
        title: '',
        content: '',
        url: '',
        keywords: '',
    });
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
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let temp = { ...userState };
        console.log('temptemp', temp)
        temp.entries.unshift(formState)
        axios.put(`http://localhost:8000/api/v1/updateOne/${localStorage.getItem('userId')}`, temp, { withCredentials: true })
            .then(res => {
                if (res.data.errors) {
                    setErrorState({
                        title: res.data.errors.title ? res.data.errors.title.message : '',
                        description: res.data.errors.description ? res.data.errors.description.message : '',
                        date: res.data.errors.date ? res.data.errors.date.message : ''
                    })
                } else {
                    console.log('successfully added to the user entries');
                    navigate('/dashboard')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    const toDashboard = (e) => {
        navigate('/dashboard')
    }

    return (
        <div>
            <NavBar path='/createblog' />
            <div className='blog-form'>
                <div>
                    <button onClick={toDashboard} className='backbtn'>Go Back</button>
                    <h2>Write your entry:</h2>
                    <form onSubmit={onSubmitHandler}>
                        <label>Title:</label>
                        {errorState.title !== '' ? <p className='errors'>{errorState.title}</p> : null}
                        <input type='text' name='title' onChange={onChangeHandler} />
                        <label>Content:</label>
                        {errorState.content !== '' ? <p className='errors'>{errorState.content}</p> : null}
                        <textarea type='text' name='content' onChange={onChangeHandler}></textarea>
                        <label>Image:</label>
                        {errorState.url !== '' ? <p className='errors'>{errorState.url}</p> : null}
                        <input type='text' name='url' onChange={onChangeHandler} placeholder='URL only'/>
                        <label>Keywords:</label>
                        {errorState.keywords !== '' ? <p className='errors'>{errorState.keywords}</p> : null}
                        <input type='text' name='keywords' onChange={onChangeHandler} />
                        <button type='submit'>Post</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default BlogForm;