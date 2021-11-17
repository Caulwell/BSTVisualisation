import "./TreeMetaPanel.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TreeMetaPanel({treeFromCSV}){


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = e => {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0]);
    };

    const handleButtonPress = e => {
        switch(e.currentTarget.getAttribute("name")){
          case "generateButton":
              treeFromCSV(selectedFile);
              break;
          default:
              break;

        }
      
    };


    return (
        <div className="tree-meta-panel">
            <div className="tree-meta-item tree-type-item">
                <div className="btn-group">
                <Link to={"/bst"}>
                <button class="first-child">
                    BST
                </button>
                </Link>

                <Link to={"/avl"}>
                <button className="middle-child">
                    AVL
                </button>
                </Link>

                <Link to={"/red-black"}>
                <button className="last-child">
                    Red-Black
                </button>
                </Link>

                </div>
               
            </div>

            <div className="tree-meta-item random-tree-item">
                 Random Tree
                <button>
                    Generate
                </button>
            </div>

            <div className="tree-meta-item csv-tree-item">
                 Upload CSV
                <input type="file" accept="*.csv" onChange={handleFileInput}>
                    
                </input>
                <button name="generateButton" onClick={handleButtonPress}>
                    Generate
                </button>
            </div>

            <div className="tree-meta-item clear-tree-item">
                 Clear Tree
                <button>
                    Clear
                </button>
            </div>
        </div>
    )
}