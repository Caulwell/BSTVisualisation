import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tree from "./pages/Tree/Tree";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {useContext, useEffect, useCallback} from "react";
import { UserContext } from "./context/UserContext";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export default function App() {

  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
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
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (

    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <hr />
      <Switch>
        <Route exact path="/">
          <Tree/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
      </div>
    </Router>
    
  );
}
