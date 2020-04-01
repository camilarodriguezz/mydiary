import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router'
import axios from 'axios'
import NavBar from './NavBar';
import entryimg from '../img/entry.jpg'

function Dashboard(props) {
    console.log('dashboard', props)
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

    function check() {
        return window.confirm('This entry will be deleted permanetly. Are you sure you want to delete this entry?');
    }

    const onDelete = (e, item) => {
        if(check()===false){
            return
        } 
        console.log("e", e);
        e.preventDefault();
        console.log("the item:", item);
        console.log("the item _id:", item._id);
        let temp = { ...userState }
        temp.entries = temp.entries.filter(el => el._id !== item._id)
        axios.put(`http://localhost:8000/api/v1/updateOne/${userState._id}`, temp, { withCredentials: true })
            .then(() => setRefresher(!refresher))
            .catch(err => console.log(err))
    }
    console.log('user display', userState)
    const toCreateBlog = (e) => {
        navigate('/createblog')
    }

    return (
        <div>
            <NavBar path='/dashboard' />
            <div className='dashboard'>
            <button onClick={toCreateBlog} className='write-entry'>+ New entry</button>
                {userState.entries !== undefined && userState.entries.map((item, index) => (
                    <div key={index} className='entries-div'>
                        {item.url !== '' ? <img className='entry-img' src={item.url} alt="entry-img" /> : <img className='entry-img' src={entryimg} alt="entry-img" />}
                        <h1>{item.title}</h1>
                        <p className='content'>{item.content}</p>
                        <p className='lighter'>Keywords: {item.keywords}</p>
                        <p className='lighter'>Written on: {item.entryDate.substring(0, 10)}</p>
                        <button className='delete-entry' onClick={(e) => onDelete(e, item)}>X Delete</button>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Dashboard;