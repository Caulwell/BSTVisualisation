import { Link } from "react-router-dom";
import "./Header.css"

export default function Header(){

    return (

      <div className="header">
            <h3><Link to="/">TreeVis</Link></h3>
        </div>


    )
}