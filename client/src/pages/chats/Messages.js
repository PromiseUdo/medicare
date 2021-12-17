import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import FaceIcon from '@material-ui/icons/Face';
import { format } from "timeago.js";

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      alignItems:'flex-start',
      justifyContent: 'center',
      flexDirection:'column',
      margin: '15px 0'
    },
    selfContainer: {
      display: 'flex',
      alignItems:'flex-end',
      justifyContent: 'center',
      flexDirection:'column',
      margin: '15px 0'
    },
    desc: {
      display: 'flex',
      alignItems:'center',
      justifyContent: 'space-between',
      
      
     
    },
    icon: {
    marginRight : 15,
    background:'whitesmoke',
    color:'black',
    '&:hover':{
        background:'whitesmoke',
    }
  },
    time: {
    margin : '8px 0',
    textAlign:'start'
    },
    txtCont: {
        maxWidth:'500px',
    
        [theme.breakpoints.down("sm")]: {
            maxWidth:'185px',

          }
    },
    txt: {
      padding: 8,
      background :'#34b7f1',
      color:'white',
      borderRadius:'15px',
      wordBreak:'break-word',
      
    },
    self: {
      padding: 8,
      background :'whitesmoke',
      color:'black',
      borderRadius:'15px',
      wordBreak:'break-word',
      
    },
  }));

function Messages({msg,receiver}) {
    const classes = useStyles();
    return (
        <div className={msg.sender === receiver || msg.received ? classes.container : classes.selfContainer}>
            <div className={classes.desc}>
                <Fab size="small" color="secondary" aria-label="add" className={classes.icon}>
                    <FaceIcon />
                </Fab>
                <div className={classes.txtCont}>
                    <Typography variant="body2" className={ msg.sender === receiver || msg.received ? classes.txt : classes.self} gutterBottom>
                        {msg.text}
                    </Typography>

                </div>
            </div>
            <small className={classes.time}>{format(msg.createdAt)}</small>
        </div>
    )
}

export default Messages
