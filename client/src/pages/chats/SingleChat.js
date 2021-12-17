import React from 'react'
import io from 'socket.io-client';
import {useParams} from 'react-router-dom';
import { makeStyles,Paper , Button,TextField, Grid  } from '@material-ui/core';
import { AuthContext } from '../../store/auth/AuthStore';
import { ChatContext } from '../../store/chats/ChatStore';
import Typography from '@material-ui/core/Typography';


import {  getMsgs,postConversation,postMsgs ,setCurrentConversation} from '../../store/actions/ChatActions';
import Messages from './Messages'

const useStyles = makeStyles((theme) => ({

    form: {
    padding:10,
    },
    formTwo: {
        position:'fixed',
        bottom :20,
        width:'80%',
        margin: 'auto',
        padding:10,
        
        
        },

 
  }));

function SingleChat() {
    const classes = useStyles();
    const {state,dispatch} = React.useContext(AuthContext);
    const socket = React.useRef();
    const scrollRef = React.useRef();
    const chatCtx = React.useContext(ChatContext);
    const [message,setmessage]=React.useState('');
    const [inMsg,setInMsg]=React.useState([]);
    const messageReceiver = useParams().id

React.useMemo(() => {
    setInMsg([...chatCtx.state.messages])
    
}, [chatCtx.state.messages])

React.useMemo(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("connect", () => {
       console.log('connected')
      });
    
}, [])

React.useMemo(() => {
    socket.current.emit("addUser", state.user.id);
    socket.current.on("getUsers", (users) => {
     console.log(users)
    });
  }, [state]);

React.useEffect(() => {
    socket.current.on("getMessage", (data) => {
       
        if(data.sender === messageReceiver){
            setInMsg([...inMsg,{
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                received: true
              }]);
        }
        
      });
    
}, [inMsg])

    React.useEffect(() => {
        const occupants = [state.user.id,messageReceiver]
        const conversation = chatCtx.state.conversations.filter(chat => chat.members.sort().toString() === occupants?.sort().toString() )
   
        if(conversation.length === 0){
            chatCtx.dispatch(postConversation(messageReceiver,chatCtx.dispatch))  
        }else if(conversation.length > 0) {
            chatCtx.dispatch(setCurrentConversation({...conversation[0]}))
        }
      }, [messageReceiver,chatCtx.state.conversations]);


      React.useEffect(() => {
       
        if(Object.keys(chatCtx.state.conversation).length > 0)chatCtx.dispatch(getMsgs(chatCtx.state.conversation?._id,chatCtx.dispatch))
      
        
      }, [messageReceiver,chatCtx.state.conversation]);
     
  
      React.useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [inMsg]);

      const handleChange = e =>  setmessage(e.target.value)  

    const submit = e => {
        e.preventDefault();
    
        const msg = {
            sender: state.user.id,
            text: message,
            conversationId: chatCtx.state.conversation?._id,
        };
        const socke = {
            senderId: state.user.id,
            text: message,
            receiverId: messageReceiver,
            
        };
        socket.current.emit("sendMessage", socke);
        chatCtx.dispatch(postMsgs(msg))
        setInMsg([...inMsg,{...msg,createdAt: Date.now()}])
        setmessage('')
    }
    if(chatCtx.state.isLoading){
        return <h4>Loading....</h4>
    }
    return (
        <div className={classes.container}>
             <Typography variant="h6" gutterBottom>
                A Chat with {state.chattingWith}
            </Typography>
                {
                    inMsg?.map((msg,i) => <div key={i} ref={scrollRef}><Messages msg={msg} receiver={messageReceiver}/></div>)
                }

       
         <form onSubmit={submit} className={inMsg.length < 9 ? classes.formTwo : classes.form} >
            <Grid container spacing={3}>
          
                <Grid item xs={12} >
                    <TextField
                        name='message'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Message'
                        variant="outlined"
                        type='text'
                        multiline
                        rows={4}
                        value={message}
                       
                    />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    >
                        <Button style={{marginRight:15}} variant="contained" type='submit' color="primary" >
                            Send
                        </Button>

                    </Grid>
            </Grid>
         </form>
      
        </div>
    )
}

export default SingleChat
