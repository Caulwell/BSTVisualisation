import { Link } from "react-router-dom";
import "./Header.css"

export default function Header({}){

    return (

      <div className="header">
          <div className="title">
            <h3><Link to="/">TreeVis</Link></h3>
            <h4><Link to="/bst">Tree</Link></h4>
          </div>
        </div>


    )
}