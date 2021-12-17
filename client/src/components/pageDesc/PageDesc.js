import React from 'react'
import {  Typography,Button, makeStyles   } from '@material-ui/core'
import ReceiptIcon from '@material-ui/icons/Receipt';
import MenuBtn from '../menuBtn/MenuBtn';

const useStyles = makeStyles((theme) => ({
    desc : {
        width : '100%',
        margin : 'auto',
        display : 'flex',
        justifyContent: 'space-between',
        alignItems : 'center',
       
        [theme.breakpoints.down('sm')]: {
         alignItems : 'flex-start',
         flexDirection: 'column',
       
      },
     
    },


 

   }));

function PageDesc(props) {
    const classes = useStyles();
    return (
        <div className={classes.desc}>
        <Typography variant="h5"  gutterBottom>
          {props.title}
        </Typography>
        <div className={classes.btn}>
            <MenuBtn title='Last 30 Days' items={['Last 30 days','Last 6 months', 'Last 1 year']}/>
           </div>
     
       
     </div>
    )
}

export default PageDesc
