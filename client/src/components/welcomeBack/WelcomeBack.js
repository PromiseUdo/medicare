import React from 'react';
import {  makeStyles, Button   } from '@material-ui/core'
import DocSvg from './DocSvg';
const useStyles = makeStyles((theme) => ({
    container : {
        width : '100%',
        display : 'flex',
        justifyContent: 'space-between',
        alignItems : 'center',
        position:'relative',
        [theme.breakpoints.down('sm')]: {
            position:'static', 
            flexDirection:'column-reverse',
            alignItems: 'flex-start',
          
         },

    },
    desc: {
          
        display : 'flex',
        justifyContent: 'flex-start',
        alignItems : 'flex-start',
        flexDirection : 'column',
        width:'60%',
        [theme.breakpoints.down('sm')]: {
            width:'90%', 
          
         },
    
 },
    btn: {
          
       background:'rgb(126,118,254)'
    
 },
    svg: {
    position:'absolute', 
    top:-40 ,
    right:0,  
     margin:0,
     padding:0,
      
     [theme.breakpoints.down('sm')]: {
        position:'static', 
        marginTop:10,
      
     },
    
    
 },
   
   }));

function WelcomeBack() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
        <div className={classes.desc}>
            <h3>Welcome Back to Work</h3>
            <p>Today seems to be a very busy day, Your free appointments start in <strong>30mins</strong>, You still have little time to grab a coffee</p>
            <Button
            variant="contained"
            color="primary"
            aria-controls="simple-menu" aria-haspopup="true"
            classes={{containedPrimary : classes.btn}}
            
        >
            Schedule a Metting
      </Button>
        </div>
        <div className={classes.svg}>
        <DocSvg/>
        </div>
            
        </div>
    )
}

export default WelcomeBack
