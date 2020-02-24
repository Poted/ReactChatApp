import React from 'react'
import io from 'socket.io-client'
import { Container, Avatar } from '@material-ui/core';

export const CTX = React.createContext();


const initState = {
    General: [
        //{from: 'Henry', msg: 'Hello'},
       // {from: 'Harry', msg: 'World'},
        //{from: 'Hussein', msg: 'XD'}
    ],
    Team: [  
        //{from: 'CptScarecrow', msg: 'Last minutes'},
       // {from: 'CptScarecrow', msg: 'to go, guys'},
        //{from: 'Morasiu', msg: 'Oh no..'},
        //{from: 'KittyKat', msg: 'we’ll die today :c'},
        //{from: 'SgtJocko', msg: 'it was a honor to play with you!'},
       // {from: 'pot_e', msg: 'It was to fun play with you, guys'},
      
    ]
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }

        default:
            return state
    }
}


let socket; 

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type:'RECEIVE_MESSAGE', payload: msg});
          });
    }

   // const users = ['potaue', 'richard', 'elon' ]

    const user = 'Morasiu'; //+ Math.random(100).toFixed(2);

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>         
    )
}                           