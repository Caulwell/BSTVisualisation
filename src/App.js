import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tree from "./pages/Tree/Tree";
import Auth from "./pages/Auth/Auth";
import {useContext, useEffect, useCallback, useState} from "react";
import { UserContext } from "./context/UserContext";

import Header from "./components/Header/Header";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import TreeList from "./pages/TreeList/TreeList";
import { Alert } from "@mui/material";
import Footer from "./components/Footer/Footer";

export default function App() {

  const [userContext, setUserContext] = useContext(UserContext);
  const [alert, setAlert] = useState(null);

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

      setAlert({text: "You have successfully logged out", severity: "success"});
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
          return {...oldValues, details:data};
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
      getUserData();
    }
  }, [userContext.details, getUserData]);


  return (

    <Router>
      <div id="App">
      
      <Header handleLogout={handleLogout} loggedIn={userContext.token ? true : false} user={userContext.details}/>
      {alert && <Alert onClose={() => setAlert(null)} severity={alert.severity}>{alert.text}</Alert>}
      <Switch>
        <Route exact path="/">
          <Welcome/>
        </Route>
        <Route exact path="/bst">
          <Tree type="bst" setAlert={setAlert}/>
        </Route>
        <Route exact path="/avl">
          <Tree type="avl" setAlert={setAlert}/>
        </Route>
        <Route exact path="/red-black">
          <Tree type="rb" setAlert={setAlert}/>
        </Route>
        <Route exact path="/savedTrees">
          <TreeList/>
        </Route>
        <Route path="/auth" >
        {userContext.token ? <Redirect to="/"/> :  <Auth setAlert={setAlert}/> }
        </Route>
      </Switch>
      <Footer/>
      </div>
    </Router>

    
  );
}
