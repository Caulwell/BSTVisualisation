import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tree from "./pages/Tree/Tree";
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

  return (

    <Router>
      <div id="App">
      
      <Header/>
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
      </Switch>
      <Footer/>
      </div>
    </Router>

    
  );
}
