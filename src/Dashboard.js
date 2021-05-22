import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {CTX} from './Store'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '300px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    }
}));

export default function Dashboard() {

    const classes = useStyles();

    const [text, setText] = useState('')
    const {allChats, socket, user} = useContext(CTX)
    const topics = Object.keys(allChats)

    const [activeTopic, setActiveTopic] = useState(topics[0])

    function sendChatAction(value) {
        socket.emit('chat message', value)
    }

    return (
    <div>
      <Paper className={classes.root}>
        <Typography variant='h5' component='h3'>
            Chat App
        </Typography>
        <Typography component='h4'>
            {activeTopic}
        </Typography>
        <div className={classes.flex}>
            <div className={classes.topicWindow}>
                <List>
                    {
                        topics.map(topic => (
                            <ListItem onClick={e => setActiveTopic(e.target.innerText)} key={topic} button>
                                <ListItemText primary={topic} />
                            </ListItem>
                        ))
                    }
                </List>
            </div>
            <div className={classes.chatWindow}>
                    {
                    allChats[activeTopic].map((chat, i) => (
                        <div className={classes.flex} key={i}>
                            <Chip className={classes.chip} label={chat.from}/>
                            <Typography variant='body1'>{chat.msg}</Typography>
                        </div>
                    ))
                    }
            </div>
        </div>
            <div className={classes.flex}>
                <TextField 
                    label="Standard" 
                    className={classes.chatBox}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Button 
                    variant="contained"  
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                        sendChatAction({from: user, msg:text, topic:activeTopic})
                        setText('')
                    }}
                >
                    Send
                </Button>
            </div>
      </Paper>
    </div>
  );
}