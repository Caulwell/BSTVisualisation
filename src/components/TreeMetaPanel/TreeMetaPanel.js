import "./TreeMetaPanel.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TreeMetaPanel(){

    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        setSelectedButton(window.location.pathname);
    },[]);

    const handleClick = (e) => {
        setSelectedButton(e.target.name);
    };

    return (
        <div className="tree-meta-panel">
            <div className="tree-meta-item tree-type-item">
                <div className="btn-group">
                <Link to={"/bst"}>
                <button name="/bst" className={selectedButton === "/bst" ? "selectedButton first-child" : "first-child"} onClick={handleClick}>
                    BST
                </button>
                </Link>

                <Link to={"/avl"}>
                <button name="/avl" className={selectedButton === "/avl" ? "selectedButton middle-child" : "middle-child"} onClick={handleClick}>
                    AVL
                </button>
                </Link>

                <Link to={"/red-black"}>
                <button name="/red-black" className={selectedButton === "/red-black" ? " last-child selectedButton" : "last-child"} onClick={handleClick}>
                    Red-Black
                </button>
                </Link>

                </div>
               
            </div>
        </div>
    )
}