import React from 'react';
import {Link,useHistory} from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles,Paper , Button,TextField, Grid, Typography,MenuItem  } from '@material-ui/core';
import { AuthContext } from '../../store/auth/AuthStore';
import { registerDoc } from '../../store/actions/AuthActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(6),
        width:'60%',
        margin:'auto',
        
        [theme.breakpoints.down("sm")]: {
            width:'75%',
            padding: theme.spacing(3),

          }
       

       },
    container: {
       margin:0,
        height : '88vh',
        background: `url("./img/loginBg.jpg") no-repeat center center/cover`,
        paddingTop:'10%',
           
        [theme.breakpoints.down("sm")]: {
            paddingTop:'20%',
            height : '100vh',

          }
      
       

       },
    form: {
        width:'100%'
       },
    sc: {
        border: '1px solid rgb(126,118,254)',
        borderRadius: '3px',
        padding: '5px'
       },
     
    link: {
       textDecoration:'none'
       },
     
  
   }));

function SignUp() {
    const classes = useStyles();
    const history = useHistory()
    const authCtx = React.useContext(AuthContext);
    const [state, setstate] = React.useState({})
   
  const submit = e => {
    e.preventDefault();
    const data ={
        ...state,
        password:'123456'
    }
    
    authCtx.dispatch(registerDoc(data,history,authCtx.dispatch))
     

  }
  
      const handleChange = e => {
        const {name,value} = e.target
         setstate({
             ...state,
            [name] : value
        })
        
    }

  
    return (
            <div className={classes.container}>
            
          
            <Paper className={classes.paper}>
            <Typography variant="h4"  gutterBottom>
                       Doctor's Sign-up
              </Typography>
            <form onSubmit={submit}>
            <Grid container spacing={3}>
          
                <Grid item xs={12} md={6}>
                    <TextField
                        name='name'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Name'
                        variant="outlined"
                        type='text'
                       
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='surname'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Surname'
                        variant="outlined"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='age'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Age'
                        variant="outlined"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    name="gender"
                    select
                    fullWidth
                    label="Gender"
                    onChange={handleChange}
                    helperText="Gender"
                    variant="outlined"
                    value={state.gender || ''}
                    
                    >
                        {[
                            {
                            label:'Male',
                            value:'male'
                        },
                            {
                            label:'Female',
                            value:'female'
                        },
                            {
                            label:'Other',
                            value:'other'
                        },
                           
                        ]
                        .map((option,i) => (
                            <MenuItem key={i} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='cadre'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Cadre'
                        variant="outlined"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name='department'
                        fullWidth
                        required
                        onChange={handleChange}
                        label='Department'
                        variant="outlined"
                        type='text'
                    />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    >
                    <Link className={classes.link} to='/login'>
                    <Button startIcon={<ArrowBackIosIcon />} variant="contained" type='button' color="default" >
                        Login
                    </Button>

                    </Link>
                    <Button variant="contained" type='submit' color="primary" disabled={authCtx.state.loading} >
                        Sign Up
                    </Button>

                </Grid>
               
        </Grid>
    </form>
    </Paper>
    </div>  
 
    )
}

export default SignUp
