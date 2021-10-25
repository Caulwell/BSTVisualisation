import { insertAnimation } from "../../util/animations";
import {useEffect, useState} from "react";
import { Tooltip, Button, Paper, Popper, ClickAwayListener } from "@mui/material";
import "./Node.css";

export default function Node({node, deleteNode}){

    const [inserted, setInserted] = useState(false);

    useEffect(() => {
        insertAnimation(node);
        setInserted(true);
    },[]);

    const handleClick = e => {
        if(e.target.name === "deleteButton") deleteNode(node);
         
    }

    const getTooltip = () => {
        return (
            <>
            <div>{"Depth: " + node.depth}</div>
            <div>{node.parent ? "Parent: " + node.parent.value  : "Parent: null"}</div>
            <div>{node.left ? "Left: " + node.left.value  : "Left: null"}</div>
            <div>{node.right ? "Right: " + node.right.value  : "Right: null"}</div>
            <div><Button onClick={handleClick} name="deleteButton" size="small" color="error" variant="contained" >Delete</Button></div>
            </>
        )

    }

    const tooltipText = getTooltip();

    return (
        <svg name="viewBox">
        <Tooltip title={tooltipText} arrow>
            <g name="node" className={!inserted ? "insertNode node" : "node"} id={node.id}>
            <circle 
                cx="20" 
                cy="20" 
                r="20" 
                stroke="green" 
                strokeWidth="4" 
                fill="white" 
                className={node.id}
                name={"node"+node.id}
               
            />
            <text className="svg-text" x="20" y="20"
                textAnchor="middle"
                stroke="red"
                strokeWidth="1px"
                alignmentBaseline="middle"
                className={node.id}
            >
            {node.value}
            </text>
        </g>
        </Tooltip>
       
        
        <g id={`arrow${node.id}`}>

        {node.parent && <>
                
            {node.lr === "l" ? 
            
               <path d={`M ${node.parent.x-13},${node.parent.y+13} L ${node.x+13},${node.y-13}`} style={{stroke: "green", strokeWidth: 2}}/>
            
            : <path d={`M ${node.parent.x+13},${node.parent.y+13} L ${node.x-13},${node.y-13}`} style={{stroke: "green", strokeWidth: 2}}/>
            }

        </> 
        }
        </g>
        </svg>
        
        
        
        
    )
}