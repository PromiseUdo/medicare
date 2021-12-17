import React, { useState,useContext, useEffect } from 'react'
import {Link,useHistory} from 'react-router-dom'
import { AuthContext } from '../../store/auth/AuthStore';
import { logout,getRoute, toggleChatWindow } from '../../store/actions/AuthActions';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {  List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';


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
function SidebarItems({clicked}) {
    const history = useHistory()
    
    const {state,dispatch} = useContext(AuthContext);
    const classes = useStyles();
    const [select, setselect] = useState('Dashboard');
    useEffect(() => dispatch(getRoute(history.location.pathname)), [select]);

    const items1 = [
        {
            name : 'Dashboard',
            icon : <DashboardIcon className={classes.icon} />,
            link : '/overview',
            
        },
        {
            name : 'Register Patients',
            icon : <CreateNewFolderIcon className={classes.icon} />,
            link : '/register',
            
        },
        {
            name : 'Patients',
            icon : <MeetingRoomIcon className={classes.icon} />,
            link : '/patients'
        },
       
     
    ]
   
    const handleSelected = (name) => {
        setselect(name);
        if(clicked)clicked();
       
       
    }
    return (
        <div>
              <ListItem className={classes.logo} >
                Company Logo
            </ListItem>
           
            <List>
            <ListItem >
                <h5>Main Pages</h5>
            </ListItem>
                {items1.map((item, index) =>  <Link 
                                                className={classes.link}
                                                key={index} 
                                                to={item.link}>
                                                    <ListItem 
                                                        selected={item.name === select}
                                                        onClick={() => handleSelected(item.name)} 
                                                        className={classes.listItem} 
                                                        button 
                                                    >
                                                        <ListItemIcon >{item.icon}</ListItemIcon>
                                                        <ListItemText classes={{secondary:classes.listItemText}} secondary={item.name} />
                                                    </ListItem>
                                                </Link>
                )}
            </List>
            <ListItem >
                <h5>General</h5>
            </ListItem>
            <List>
                  <ListItem 
                    onClick={() => dispatch(toggleChatWindow(true))} 
                    className={classes.listItem} 
                    button 
                    >
                        <ListItemIcon ><ChatIcon className={classes.icon} /></ListItemIcon>
                        <ListItemText classes={{secondary:classes.listItemText}} secondary='Chat' />
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

export default SidebarItems
