import "./App.css";
import Tree from "./pages/Tree/Tree";
import Header from "./components/Header/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import { CssBaseline } from "@mui/material";
export default function App() {

  return (

    <Router>
      <div id="App">
      <CssBaseline/>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Welcome/>
        </Route>
        <Route exact path="/bst">
          <Tree type="bst" />
        </Route>
        <Route exact path="/avl">
          <Tree type="avl" />
        </Route>
        <Route exact path="/red-black">
          <Tree type="rb" />
        </Route>
      </Switch>
      </div>
    </Router>

    
  );
}
