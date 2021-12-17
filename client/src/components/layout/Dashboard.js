import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Footer from '../../pages/footer/Footer';
import {  makeStyles, useTheme } from '@material-ui/core/styles';

import SidebarItems from './SidebarItems';
import TopBar from './TopBar';
import { AuthContext } from '../../store/auth/AuthStore';
import PatientsSidebar from './PatientsSidebar';
import DoctorsChatbar from './DoctorsChatbar';
import PatientsChatbar from './PatientsChatbar';
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
   
    [theme.breakpoints.down('sm')]: {
      overflowX : 'hidden'
    },
    
   },
   top : {
    overflow : 'hidden'
   },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow : 'none'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor : 'rgb(234,234,234)'
  },
  content: {
    flexGrow: 1,
 
    padding: theme.spacing(3),
    
  },
 

}));

function Dashboard(props) {
 
  const { window,children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const {state,dispatch} = React.useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.top}>
   
    <div className={classes.root}>
      <CssBaseline />
    <TopBar handleDrawerToggle={handleDrawerToggle}/>
   
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {
              state?.user?.role === 'doctor' ? (
                state.chatWindow ? <DoctorsChatbar clicked={handleDrawerToggle}/> : <SidebarItems clicked={handleDrawerToggle}/>
                )  : (
                    state.chatWindow ? <PatientsChatbar clicked={handleDrawerToggle}/> : <PatientsSidebar clicked={handleDrawerToggle}/> 
                        )
            }
            
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {
              state?.user?.role === 'doctor' ? (
                state.chatWindow ? <DoctorsChatbar/> : <SidebarItems/>
                )  : (
                    state.chatWindow ? <PatientsChatbar/> : <PatientsSidebar/> 
                        )
            }
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
    <div style={{display : `${state.chatWindow ? 'none' : 'block'}`}}>
        <Footer/>
    </div>
    </div>
  );
}



export default Dashboard;
