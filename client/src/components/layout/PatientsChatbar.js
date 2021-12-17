import React, { useState,useContext, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../../store/auth/AuthStore';
import { logout,getRoute, toggleChatWindow, chattingWith } from '../../store/actions/AuthActions';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {  List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'


import NestedList from '../nestedList/NestedList';
import { DoctorContext } from '../../store/doctor/DoctorStore';
import { getDoctors } from '../../store/actions/DoctorActions';


export const useStyles = makeStyles((theme) => ({
    listItem : {
      fontSize: '15px',
     '&:hover' : {
      background: 'white'
     },  
    },
  
    listItemText : {
      fontSize: '15px'
    },
    icon: {
      fontSize: '20px',
      color:'rgb(126,118,254)'
    },
    iconBtn :{
     border : '1px solid #ffd8d5',
     width : '38px',
     height : '38px',
     background: 'transparent',
     marginLeft : '5px',
     alignSelf: 'center'

    },

    logo:{
      margin : '0',
      
    },
    img:{
      marginTop : '15px',
      width: '30px',
      height : '20px',
    },
    link: {
        textDecoration : 'none'
    }
   
  }));
function PatientsChatbar({clicked}) {
    const history = useHistory()
    
    const {state,dispatch} = useContext(AuthContext);

    const docCtx = useContext(DoctorContext);

    const classes = useStyles();
    const [select, setselect] = useState('Dashboard');


    useEffect(() => dispatch(getRoute(history.location.pathname)), [select]);

    useEffect(() => dispatch(getRoute(history.location.pathname)), [select]);
    useEffect(() => {
        
        if(Object.keys(docCtx.state.doctors).length === 0)docCtx.dispatch(getDoctors(docCtx.dispatch))
        
    }, []);

    const items1 = docCtx?.state?.doctors?.data?.map(doctor => {
        return {
            name: `${doctor.name} ${doctor.surname}`,
            link : `/chat/${doctor._id}`
        }
    })

   
    const handleSelected = (name) => {
      setselect(name);
      if(clicked)clicked();
      dispatch(chattingWith(name))
     
     
  }
    return (
        <div>
              <ListItem className={classes.logo} >
                <h4>Company Logo</h4>
            </ListItem>

            <ListItem >
                <h5>Registered Doctors</h5>
            </ListItem>
            <List>
           
                <NestedList
                  name='Doctors'
                  handleSelected={handleSelected}
                  select={select}
                  icon={<LocalHospitalIcon className={classes.icon} />}
                  collapseItems={items1}
                
                />
            </List>
            <ListItem >
                <h5>General</h5>
            </ListItem>
            <List>
           
                  <ListItem 
                        onClick={() => dispatch(toggleChatWindow(false))} 
                        className={classes.listItem} 
                        button 
                        >
                            <ListItemIcon ><DashboardIcon className={classes.icon} /></ListItemIcon>
                            <ListItemText classes={{secondary:classes.listItemText}} secondary='Back To Home' />
                        </ListItem>
                  <ListItem 
                        onClick={() => dispatch(logout())} 
                        className={classes.listItem} 
                        button 
                        >
                            <ListItemIcon ><ExitToAppIcon className={classes.icon}/></ListItemIcon>
                            <ListItemText classes={{secondary:classes.listItemText}} secondary='Logout' />
                        </ListItem>
            </List>
    </div>
    )
}

export default PatientsChatbar
