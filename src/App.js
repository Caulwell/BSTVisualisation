import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tree from "./pages/Tree/Tree";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export default function App() {

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
