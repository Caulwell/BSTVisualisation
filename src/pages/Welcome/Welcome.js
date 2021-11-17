import "./Welcome.css";
import { Link } from "react-router-dom";
import bstImage from "../../images/BST.png";
import avlImage from "../../images/AVL.png";
import rbImage from "../../images/RB.png";

export default function Welcome(){


  

    return (
    <>
    <div className="Welcome">
        <div className="hero">
            <h1>TreeVis</h1>
        </div>

        <div className="tree-links">
        <Link to="/bst">
            <div className="BST-card tree-card">
                <img src={bstImage}/>
                <div className="tree-card-content">
                    <h3>Binary Search Tree</h3>
                </div>
            </div>
        </Link>
        <Link to="/avl">
            <div className="AVL-card tree-card">
                <img src={avlImage}/>
                <div className="tree-card-content">
                    <h3>AVL Tree</h3>
                </div>
            </div>
        </Link>
        <Link to="/red-black">
            <div className="RB-card tree-card">
                <img src={rbImage}/>
                <div className="tree-card-content">
                    <h3>Red-Black Tree</h3>
                </div>
            </div>
        </Link>
        
        </div>
    </div>
    </>
    )
}