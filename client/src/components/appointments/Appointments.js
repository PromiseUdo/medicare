import React from 'react'
import {  Typography, makeStyles,Avatar, IconButton,    } from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    container : {
      padding:9,
        margin:'10px 0',
        color:'black',
        borderRadius:'3%'
        
     
    },
    desc : {
        width : '100%',
        display : 'flex',
        justifyContent: 'space-between',
        alignItems : 'center',
        color:'black'
        
     
    },


 

   }));

function Appointments({color}) {
    const classes = useStyles();
    return (
        <div  className={classes.container} style={{border:`2px solid ${color}`}}>
            <Typography variant="caption"  gutterBottom>
                9am
            </Typography>
            <hr/>
        <div className={classes.desc}>
         <IconButton
            className={classes.iconBtn} 
              edge="end"
              aria-label="account of current user"
              aria-controls="account of current user"
              aria-haspopup="true"
              
              color="inherit"
            >
               <Avatar className={classes.small} alt="Remy Sharp" src="./img/avatar.jpg" />
            </IconButton>
        <div className={classes.name}>
            <Typography variant="body1"  gutterBottom>
                Sol Campbell
            </Typography>
            <Typography variant="body2"  gutterBottom>
                9am-10am
            </Typography>
        </div>
       
        <IconButton
            className={classes.iconBtn} 
              edge="end"
              aria-label="account of current user"
              aria-controls="account of current user"
              aria-haspopup="true"
              
              color="inherit"
            >
             <MoreVertIcon/>
            </IconButton>
        </div>
        </div>
        
    )
}

export default Appointments
