import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tree from "./pages/Tree/Tree";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {useContext, useEffect, useCallback, useState} from "react";
import { UserContext } from "./context/UserContext";

import Header from "./components/Navbar/Header";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import { Alert } from "react-bootstrap";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TreeList from "./pages/TreeList/TreeList";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});


export default function App() {

  const [userContext, setUserContext] = useContext(UserContext);
  const [message, setMessage] = useState({});

  const verifyUser = useCallback(() => {
    if(userContext.token){
      fetch("http://localhost:4000/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
    })
    .then(async response => {
      if(response.ok){
        const data = await response.json();
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token};
        });
      } else {
        setUserContext(oldValues => {
          return {...oldValues, token: null};
        });
      }
      setTimeout(verifyUser, 5*60*1000);
    });
    }
    
  }, [setUserContext]);



  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      });
      window.localStorage.setItem("logout", Date.now());

      setMessage({text: "You have successfully logged out", variant: "success"});

      setTimeout(() => {
        setMessage({});
      },3000);
    });
  };

  const getUserData = useCallback(() => {
    fetch("http://localhost:4000/getUser", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    })
    .then(async response => {
      if(response.ok){
        const data = await response.json();
        setUserContext(oldValues => {
          return {...oldValues, details:data}
        });
      } else {
        if(response.status === 401){
          // window.location.reload();
          console.log(response);
        } else {
          setUserContext(oldValues => {
            return {...oldValues, details: null};
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if(!userContext.details){
      getUserData()
    }
  }, [userContext.details, getUserData]);


  return (

    <Router>
      <div id="App">
      <ThemeProvider theme={theme}>
      <Header handleLogout={handleLogout} loggedIn={userContext.token ? true : false} user={userContext.details}/>
      </ThemeProvider>
      <Switch>
        <Route exact path="/">
          <Welcome/>
        </Route>
        <Route exact path="/bst">
          <Tree type="bst"/>
        </Route>
        <Route exact path="/avl">
          <Tree type="avl"/>
        </Route>
        <Route exact path="/red-black">
          <Tree type="red-black"/>
        </Route>
        
        <Route exact path="/savedTrees">
        <ThemeProvider theme={theme}>
          <TreeList/>
        </ThemeProvider>
        </Route>
        <Route path="/register">
        {userContext.token ? <Redirect to="/"/> :  <Register/> }
        </Route>
        <Route path="/login">
        {userContext.token ? <Redirect to="/"/> :  <Login/> }
        </Route>
      </Switch>
      </div>
    </Router>
    
  );
}
