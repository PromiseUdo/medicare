import React,{useContext} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../../store/auth/AuthStore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { AppBar, Avatar, Badge, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      overflowX : 'hidden'
    },
    
   },

  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow : 'none'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  date : {
    fontSize : '10px',
    color: 'gray'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor : 'rgb(234,234,234)'
  },
  

  icon: {
    fontSize: '15px'
  },
  iconBtn :{
   border : '1px solid #ffd8d5',
   width : '38px',
   height : '38px',
   background: 'transparent',
   marginLeft : '5px',
   alignSelf: 'center'

  },
  ntnBtn : {
    width : '38px',
   height : '38px',
   background: '#e8e8e8',
   marginRight : '7px',
   alignSelf: 'center'
  },
  logo:{
    marginTop : '15px'
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
 
 

}));

function TopBar({handleDrawerToggle}) {
  const {state} = useContext(AuthContext);
    const classes = useStyles();
    const header = state?.route?.match(/([a-z])\w+/g);
    const capitalize = String(header).replace(/^(.)|\s+(.)/g, c => c.toUpperCase());

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id='mobileMenuId'
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
         
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge  variant="dot" color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem>
            <IconButton
             className={classes.iconBtn} 
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar className={classes.small} alt="Remy Sharp" src="./img/avatar.jpg" />
            </IconButton>
            <p style={{marginLeft : '5px'}}>Profile</p>
          </MenuItem>
        </Menu>
      );

    return (
        <div>
        <AppBar position='absolute' color='transparent' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div>
          <Typography style={{fontWeight : 'bold'}} variant="subtitle1" noWrap>
            {state.chatWindow ? 'Chats' : capitalize}
          </Typography>
          <small className={classes.date}>
            Today, 20th october 2020
          </small>
         

          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
   
            <IconButton  className={classes.ntnBtn}  aria-label="show 17 new notifications" color="inherit">
              <Badge  variant="dot"  color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
            className={classes.iconBtn} 
              edge="end"
              aria-label="account of current user"
              aria-controls="account of current user"
              aria-haspopup="true"
              
              color="inherit"
            >
               <Avatar className={classes.small} alt="Remy Sharp" src="./img/avatar.jpg" />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
    )
}

export default TopBar
