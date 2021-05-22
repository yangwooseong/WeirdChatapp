import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const CTX = React.createContext(); 

/*
    msg: {
        from: 'user',
        msg: 'hi',
        topic: 'general'
    }

    state: {
        topic1: [
            {msg}, {msg}
        ]
        topic2: [
            {msg}
        ]
    }
*/

const initState = {
    general: [
        {from: 'aaron', msg: 'hello'},
        {from: 'archer', msg: 'hi'}
    ],
    topic2: [
        {from: 'aaron', msg: 'hola'}
    ]
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload
    console.log(state)
    console.log(action.payload)
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            console.log(1)
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }
        default:
            return state
    }
}



export default function Store(props) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io('ws://127.0.0.1:5000')
        setSocket(socket)
        socket.on('connect', () => console.log('connected'))
        socket.on('chat message', msg => {
            console.log('msg: ', msg)
            dispatch({payload: msg, type: 'RECEIVE_MESSAGE'})
        })
    }, [])
    
    const [allChats, dispatch] = React.useReducer(reducer, initState)

    console.log('after',allChats)

    const user = 'aaron' + Math.random(100).toFixed(2)

    return (
        <CTX.Provider value={{allChats, socket, user}} >
            {props.children}
        </CTX.Provider>
    )
} 