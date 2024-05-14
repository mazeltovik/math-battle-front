//Styles
import './searchPage.scss';

//Types

//Images

//MUI

//Components

//React
import { useState, useEffect } from 'react';
//Hooks

//Helpers

//Handlers
import showRooms from '../../socket/events/showRooms';
//Socket
import { socket } from '../../socket/socket';

export default function SearchPage(){
    useEffect(()=>{
        socket.on('connect',()=>{
            socket.emit('showRooms', { name: 'Nest' });
        })
        socket.on('showRooms', (data) => console.log(data))
    },[])
    return (
        <p onClick={()=>socket.emit('showRooms', { name: 'Nest' })}>Search Page</p>
    )
}