import "./TreeMetaPanel.css";
import { Link } from "react-router-dom";
export default function TreeMetaPanel({type}){

    return (
        <div className="tree-meta-panel">
            <div className="tree-meta-item tree-type-item">
                <div className="btn-group">
                <Link to={"/bst"}>
                <button name="/bst" className={type === "bst" ? "selectedButton first-child" : "first-child"} >
                    BST
                </button>
                </Link>

                <Link to={"/avl"}>
                <button name="/avl" className={type === "avl" ? "selectedButton middle-child" : "middle-child"} >
                    AVL
                </button>
                </Link>

                <Link to={"/red-black"}>
                <button name="/red-black" className={type === "rb" ? " last-child selectedButton" : "last-child"} >
                    Red-Black
                </button>
                </Link>

                </div>
               
            </div>
        </div>
    )
}