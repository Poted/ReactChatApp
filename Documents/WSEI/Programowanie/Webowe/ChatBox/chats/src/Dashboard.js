import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from './Store';


//tymczasowe style
import './Dashboard.css';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),

    },

    header: {
        backgroundImage: "url('./fantasy-background-city.jpg')",
        backgroundSize: "110%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white"
        //filter: "blur(10px)"
    },

    list: {
        backgroundColor: "green"
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
        height: '300px',
        padding: '20px'
    },

    chatBox: {
        width: '85%'
    },

    button: {
        width: '15%'
    }
    
}))

export default function Dashboard() {

    const classes = useStyles();

    //CTX Store
    const {allChats, sendChatAction, user} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    //local state

    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [textValue, changeTextValue] = React.useState('');


    window.onload=function() {

        var input = document.getElementById("txtField");
        input.addEventListener("keypress", function(event) {
        
            if (event.keyCode === 13 && !input.value == '') {
                event.preventDefault();
                document.getElementById("sendBtn").click();
            } 
        });
    
    }

    return (
            <Paper className={classes.root}>
                <div className={classes.header}>

                    <Typography variant="h4" component="h4">
                        Chat App
                    </Typography>

                    <Typography variant="h5" component="h5">
                        {activeTopic}
                    </Typography>
                
                </div>

                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        <List className={classes.list}>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
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
                                    <Chip label={chat.from} className={classes.chip}/>
                                    <Typography variant='body1' gutterBottom>
                                        {chat.msg}
                                    </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={classes.flex}>
                    <TextField 
                        id="txtField"
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    <Button
                        id="sendBtn"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({from: user, msg: textValue, topic: activeTopic})
                            changeTextValue('');
                        }}    
                    >
                        Send
                    </Button>

                </div>
            </Paper>
    )
}