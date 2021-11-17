import { Link } from "react-router-dom";
import "./Header.css"

export default function Header({loggedIn, handleLogout, user}){

    return (

      <div className="header">
          <div className="title">
            <h3><Link to="/">TreeVis</Link></h3>
            <h4><Link to="/bst">Tree</Link></h4>
          </div>

          <div className="authLinks">
              {loggedIn ? 
                <Link to="/savedTrees">{user ? user.username : "User"}</Link>
                :
                <Link to="/auth">Login/Register</Link>
                
              }
            </div>
        </div>


    )
}