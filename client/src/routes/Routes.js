import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import DoctorsRoutes from './DoctorsRoutes';
import PublicRoutes from './PublicRoutes';
import { AuthContext } from '../store/auth/AuthStore';
import jwt_decode from 'jwt-decode'
import PatientsRoutes from './PatientsRoutes';
import setAuthToken from '../store/actions/utils/setAuthToken';
import { logout, setCurrentUser } from '../store/actions/AuthActions';

import ChatRoutes from './ChatRoutes';

function Routes() {
    const {state,dispatch} = React.useContext(AuthContext);
    React.useEffect(() => {
    
             //to make sure d user stays loged in after pg refresh & also logout user after d token expires
            if (localStorage.user) {
                
                //set req header to dt token
                const {token,role} = JSON.parse(localStorage.getItem('user'))
                setAuthToken(token,role);
                const decoded = jwt_decode(token);
                //
                //dispatch setcurrentuser function wic passes decoded as payload to store nd set it as stores 'user' state
                dispatch(setCurrentUser({...decoded,role}));

                //logout user after code expiration
                const currentTime = Date.now() / 1000;
            
                if (decoded.exp < currentTime) {
                    dispatch(logout());
                //set profile state to null in d reducer by dispatching an action to it
                //
                //redirect to login
                window.location.href = "/login";
                }
            }
       
    }, [])


   
    return (
       <Router>
           {state.isAuthenticated ? (
                state?.user?.role === 'doctor' ? (
                    state.chatWindow ? <ChatRoutes/> : <DoctorsRoutes/>
                    )  : (
                        state.chatWindow ? <ChatRoutes/> : <PatientsRoutes/> 
                            )
                )
           : <PublicRoutes/>
           }
       </Router>
    )
}

export default Routes
