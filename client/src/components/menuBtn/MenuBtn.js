import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TodayIcon from '@material-ui/icons/Today';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {  makeStyles   } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({

  btn: {
        
     background:'rgb(126,118,254)'
  
},

 
 }));
 function MenuBtn(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Button
            variant="contained"
            color="primary"
            aria-controls="simple-menu" aria-haspopup="true"
            startIcon={<TodayIcon />}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleClick}
            style={{width : '100%'}}
            classes={{containedPrimary : classes.btn}}
        >
       {props.title}
      </Button>
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
          {
              props.items.map((item,i) => <MenuItem key={i} onClick={handleClose}>{item}</MenuItem>)
          }
        
       
      </Menu>
    </div>
  );
}
export default MenuBtn