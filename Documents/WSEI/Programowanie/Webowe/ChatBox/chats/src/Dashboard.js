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
//import './Dashboard.css';
import { Container, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundImage: "url('./fanback.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '700px',
        width: '2000px',
    },



    root: {
        //marginTop: '50px',
        margin: 'auto',
        padding: theme.spacing(3, 2),
        width: '30%',
        //height: '30%',
        backgroundImage: "url('./browntxtr.jpg')",
        color: 'white',
    
        //backgroundPosition: 'center',
       // backgroundRepeat: 'no-repeat',
       // backgroundAttachment: 'fixed'
       //background: '-webkit-linear-gradient(#eee, #333)',
       //WebkitBackgroundClip: 'text',
       //WebkitTextFillColor: 'transparent'
    },

    header: {
        color: "#deBb05",
        backgroundImage: "url('./div.png')",
    },

    list: {
       // backdropFilter: 'blur(2px)'
        //backgroundColor: "green"
    },
    

    flex: {
        display: 'flex',
        alignItems: 'center',
    },

    topicWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },

    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px',
    },

    chatBox: {
        width: '85%',
    },

    button: {
        backgroundImage: 'url(./button.jpg)',
        width: '15%'
    },

    msg: {
        marginLeft: '5px',
        wordWrap: 'break-word',
        position: 'relative',
        display: 'inline-block'
    },

    chip: {
        backgroundColor: 'gold',
        fontWeight: 'bold',
        margin: '0'
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
        

        <Container fixed className={classes.container}>

            <Paper className={classes.root}>
                <Paper className={classes.header}>

                    <Typography variant="h4" component="h4">
                        GhoulNite
                    </Typography>

                    <Typography variant="h5" component="h5">
                        {activeTopic}
                    </Typography>
                
                </Paper>

                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                        <List className={classes.list}>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                    )   
                                )
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    
                                    <Chip label={chat.from} className={classes.chip}/> 
                                  {/*} <Avatar id="a1" src='./avatar1.jpg' /> */}
                                  
                                  <Typography className={classes.msg} variant='body1' gutterBottom>
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

        </Container>
    )
}