import "./Welcome.css";
import { Link } from "react-router-dom";
import bstImage from "../../images/BST.png";
import avlImage from "../../images/AVL.png";
import rbImage from "../../images/RB.png";

import {UserContext} from "../../context/UserContext";
import { useHistory } from "react-router";
import { useContext } from "react";

export default function Welcome(){


    const [,setUserContext] = useContext(UserContext);
    let history = useHistory();


    const handleRandomTree = () => {

        let randomNum = Math.random();

        let tree = "";

        if(randomNum >= 0 && randomNum <= 0.33){
            tree = "/bst";
        } else if(randomNum > 0.33 && randomNum <= 0.66){
            tree = "/avl";
        } else {
            tree = "/red-black";
        }

        setUserContext(oldValues => {
            return {...oldValues, randomTree: true}
        });


        

        history.push(tree);

    }
  

    return (
    <>
    <div className="Welcome">
        <div className="hero">
            <div className="title">
                <h1>TreeVis</h1>
                <svg
                    width="8rem"
                    height="8rem"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M12.7401 16.3185C12.035 17.1126 11.0808 17.6806 10 17.9V21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21V17.9C5.71776 17.4367 4 15.419 4 13V7C4 4.23858 6.23858 2 9 2C11.6087 2 13.7508 3.99781 13.9797 6.54693C14.5726 6.1993 15.2631 6 16 6C18.2091 6 20 7.79086 20 10V14C20 15.8638 18.7252 17.4299 17 17.874V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V17.874C14.0747 17.6358 13.279 17.075 12.7401 16.3185ZM12 7V13C12 14.3062 11.1652 15.4175 10 15.8293V13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13V15.8293C6.83481 15.4175 6 14.3062 6 13V7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7ZM17 15.7324V13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13V15.7324C14.4022 15.3866 14 14.7403 14 14V10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10V14C18 14.7403 17.5978 15.3866 17 15.7324Z"
                        fill="white"
                    />
                </svg>
            </div>
            <div className="call-to-action">
                <button onClick={handleRandomTree}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z"
                        fill="currentColor"
                    />
                    <path
                        d="M16.9451 14.8921C15.8405 14.8921 14.9451 15.7875 14.9451 16.8921C14.9451 17.9967 15.8405 18.8921 16.9451 18.8921C18.0496 18.8921 18.9451 17.9967 18.9451 16.8921C18.9451 15.7875 18.0496 14.8921 16.9451 14.8921Z"
                        fill="currentColor"
                    />
                    <path
                        d="M5.05518 7.05518C5.05518 5.95061 5.95061 5.05518 7.05518 5.05518C8.15975 5.05518 9.05518 5.95061 9.05518 7.05518C9.05518 8.15975 8.15975 9.05518 7.05518 9.05518C5.95061 9.05518 5.05518 8.15975 5.05518 7.05518Z"
                        fill="currentColor"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 4C1 2.34315 2.34315 1 4 1H20C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"
                        fill="currentColor"
                    />
                </svg>
                    Generate Random Tree
                </button>
                <button>
                    <svg
                        className="book"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 5.5H9C10.1046 5.5 11 6.39543 11 7.5V16.5C11 17.0523 10.5523 17.5 10 17.5H4C3.44772 17.5 3 17.0523 3 16.5V6.5C3 5.94772 3.44772 5.5 4 5.5ZM14 19.5C13.6494 19.5 13.3128 19.4398 13 19.3293V19.5C13 20.0523 12.5523 20.5 12 20.5C11.4477 20.5 11 20.0523 11 19.5V19.3293C10.6872 19.4398 10.3506 19.5 10 19.5H4C2.34315 19.5 1 18.1569 1 16.5V6.5C1 4.84315 2.34315 3.5 4 3.5H9C10.1947 3.5 11.2671 4.02376 12 4.85418C12.7329 4.02376 13.8053 3.5 15 3.5H20C21.6569 3.5 23 4.84315 23 6.5V16.5C23 18.1569 21.6569 19.5 20 19.5H14ZM13 7.5V16.5C13 17.0523 13.4477 17.5 14 17.5H20C20.5523 17.5 21 17.0523 21 16.5V6.5C21 5.94772 20.5523 5.5 20 5.5H15C13.8954 5.5 13 6.39543 13 7.5ZM5 7.5H9V9.5H5V7.5ZM15 7.5H19V9.5H15V7.5ZM19 10.5H15V12.5H19V10.5ZM5 10.5H9V12.5H5V10.5ZM19 13.5H15V15.5H19V13.5ZM5 13.5H9V15.5H5V13.5Z"
                            fill="currentColor"
                        />
                    </svg>
                    Learn Some More
                </button>
            </div>
            
        </div>

        <div className="tree-links">
        <Link to="/bst">
            <div className="BST-card tree-card">
                <img src={bstImage} alt="A Binary Search Tree"/>
                <div className="tree-card-content">
                    <h3>Binary Search Tree</h3>
                </div>
            </div>
        </Link>
        <Link to="/avl">
            <div className="AVL-card tree-card">
                <img src={avlImage} alt="An AVL Tree"/>
                <div className="tree-card-content">
                    <h3>AVL Tree</h3>
                </div>
            </div>
        </Link>
        <Link to="/red-black">
            <div className="RB-card tree-card">
                <img src={rbImage} alt="A Red-Black Tree"/>
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