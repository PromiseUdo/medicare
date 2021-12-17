import React from 'react'
import {  Typography, makeStyles,Avatar, IconButton,    } from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    container : {
        width : '100%',
       
        display : 'flex',
        justifyContent: 'space-evenly',
        alignItems : 'center',
        [theme.breakpoints.down('sm')]: {
            alignItems : 'space-evenly',
            flexDirection: 'column',
            border:'1px solid rgb(126,118,254)',
            margin : '5px 0'
           
          
         },
        
     
    },
    first : {
        display : 'flex',
        justifyContent: 'space-evenly',
        alignItems : 'center',
        width:'100%',
    },
   }));

function RecentPatient() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div  className={classes.first}>
                <IconButton
                   
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
                        cambel@gmail.com
                    </Typography>
                </div>
            </div>
        <div className={classes.first}>
            <div className={classes.diagnosis}>
                <Typography variant="body2"  gutterBottom>
                    Diagnosis
                </Typography>
                <Typography variant="body1"  gutterBottom>
                    live Cirosis
                </Typography>
            </div>
            <IconButton
               
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

export default RecentPatient
