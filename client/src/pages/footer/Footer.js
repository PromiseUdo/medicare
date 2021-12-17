import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, makeStyles,Paper   } from '@material-ui/core';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    paper: {
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            width : '100%',
            marginLeft : '0'
        },
       },
       link : {
           margin : '0 10px'
       }
     
   
   }));
function Footer() {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
             <Grid item  xs={12} >
                <Paper className={classes.paper}>
                    <div>
                        &#169; 2021 Medicare Demo App
                    </div>
                    <div>
                        <Link className={classes.link} to='#'>Terms</Link>
                        <Link className={classes.link}  to='#'>Privacy</Link>
                        <Link className={classes.link} to='#'>Help</Link>
                    </div>
                </Paper>

             </Grid>
        </Grid>

       
    )
}

export default Footer
