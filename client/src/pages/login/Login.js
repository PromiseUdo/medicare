import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles,Paper , Button,TextField,  } from '@material-ui/core';
import { AuthContext } from '../../store/auth/AuthStore';
import { login } from '../../store/actions/AuthActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        width : '350px',
        height : '400px',
        margin : ' 100px auto',
        display : 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection : 'column',
      
        [theme.breakpoints.down("sm")]: {
            margin : ' 150px auto',
            width: `80%`
        }
       
       },
    form: {
        margin : '15px 0',
       
       },
    signUp: {
        display : 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width:'40%'
       
       },
       txtField: {
        marginTop : '25px',
       
       },
    link: {
        marginBottom : '30px',
       
       },
       bg: {
        height : '100vh',
        background: `url("./img/loginBg.jpg") no-repeat center center/cover`,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
         
    },
   }));
function Login() {
    const classes = useStyles();
    const authCtx = useContext(AuthContext);
    const [state, setstate] = React.useState({
        name:'',
        password : '123456',
    })
  
  const onLogin = e => {
      e.preventDefault();
  
      if(state.name){
        authCtx.dispatch(login('patient',state,authCtx.dispatch))
    }else{
        alert('please put a name')
    }
  }
  const onDoctor = e => {
      e.preventDefault();
      if(state.name){
          authCtx.dispatch(login('doctor',state,authCtx.dispatch))
      }else{
          alert('please put a name')
      }

  }
  
      const handleChange = e => {
        const {name,value} = e.target
         setstate({
             ...state,
            [name] : value
        })
        
    }
    return (
        <div className={classes.bg}>
            <Paper className={classes.paper}>
                <div className={classes.txtField}>
                <TextField
                    name='name'
                    fullWidth
                    value={state.name}
                    onChange={handleChange}
                    label='Name'
                    variant="outlined"
                    type='text'
                    className={classes.form}
                />
                <TextField
                    name='password'
                    fullWidth
                    className={classes.form}
                    value={state.password}
                    onChange={handleChange}
                    label='Password'
                    variant="outlined"
                    type='password'
                />
                 <Button fullWidth variant="contained" color="primary" style={{marginBottom:'10px'}} onClick={onDoctor} disabled={authCtx.state.loading}>
                    Doctor Login
                </Button>
                <Button fullWidth variant="contained" color="secondary" onClick={onLogin} disabled={authCtx.state.loading}>
                   Patient Login
                </Button>
               
                </div>
                <div className={classes.signUp}><h5>A Doctor?</h5>  <Link  to='/signup'>SignUp</Link></div>
                <Link className={classes.link} to='#'>Forgot Password?</Link>
            </Paper>
        </div>
    )
}

export default Login
