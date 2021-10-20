import { Link } from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, } from "@mui/material";

export default function Header({loggedIn, handleLogout, user}){

    return (
        <AppBar position="static">
          <Toolbar>
            <div className="titleLinks">
              <Typography variant="h6" component={Link} to={"/"}>
                TreeVis
              </Typography>
            </div>

            <div className="treeLinks">
              <Button color="inherit" component={Link} to={"/bst"}>BST</Button>
              <Button color="inherit" component={Link} to={"/avl"}>AVL</Button>
              <Button color="inherit" component={Link} to={"/red-black"}>Red-Black</Button>
            </div>

            
              
            <div className="authLinks">
            {loggedIn ? 
              <><Button color="inherit" component={Link} to={"/login"}>{user ? user.username : "User"}</Button>
              <Button color="inherit" component={Link} to={"/logout"}>Logout</Button></>
              :
              <><Button color="inherit" component={Link} to={"/login"}>Login</Button>
              <Button color="inherit" component={Link} to={"/register"}>Register</Button></>
            }
              
            </div>
          
        </Toolbar>
      </AppBar>             
    )
}