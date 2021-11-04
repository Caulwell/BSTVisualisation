import { Link } from "react-router-dom";
import { useState } from "react";
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined"

export default function Header({loggedIn, handleLogout, user}){

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

    return (
        <AppBar position="static">
          <Toolbar  >
            <div className="titleLinks">
              <Typography variant="h6" component={Link} to={"/"}>
                TreeVis
              </Typography>
            </div>

            
              
            <div className="authLinks">
            <Button color="inherit" component={Link} to={"/bst"}><NatureOutlinedIcon fontSize="medium"/>Trees</Button>
            {loggedIn ? 
              <><Button id="userButton"color="inherit" onClick={handleClick} aria-controls="menu" aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
              <AccountCircleOutlinedIcon fontSize="medium"/>  {user ? user.username : "User"}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'userButton',
                }}
              >
                <MenuItem component={Link} to={"/savedTrees"} onClick={handleClose}>Saved Trees</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              </>
              :
              <Button color="inherit" component={Link} to={"/auth"}><AccountCircleOutlinedIcon fontSize="medium"/> Login/Register</Button>
              
            }
              
            </div>
          
        </Toolbar>
      </AppBar>             
    )
}