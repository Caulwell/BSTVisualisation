import { insertAnimation } from "../../util/animations";
import {useContext, useEffect, useState} from "react";
import { Tooltip, Button, ClickAwayListener } from "@mui/material";
import "./Node.css";
import { UserContext } from "../../context/UserContext";

export default function Node({node, deleteNode}){

    const [inserted, setInserted] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [userContext] = useContext(UserContext);

    useEffect(() => {
        insertAnimation(node, userContext.animationSpeed);
        setInserted(true);
    },[]);

    const handleClick = e => {
        if(e.target.name === "deleteButton") deleteNode(node);
         
    };

    const handleTooltipClose = () => {
        setTooltipOpen(false);
    };

    const handleTooltipOpen = () => {
        setTooltipOpen(!tooltipOpen);
    };

    const getTooltipContent = () => {
        return (
            <>
            <div>{"Depth: " + node.depth}</div>
            <div>{node.parent ? "Parent: " + node.parent.value  : "Parent: null"}</div>
            <div>{node.left ? "Left: " + node.left.value  : "Left: null"}</div>
            <div>{node.right ? "Right: " + node.right.value  : "Right: null"}</div>
            {(node.getBalanceFactor() >=0 || node.getBalanceFactor() < 0) && <div>Balance Factor: {node.getBalanceFactor()}</div>}
            {node.getHeight() >=0 && <div>Height: {node.getHeight()}</div>}
            <div className="tooltip-button"><Button onClick={handleClick} name="deleteButton" size="small" color="error" variant="contained" >Delete</Button></div>
            </>
        )

    }

    const tooltipText = getTooltipContent();

    return (
        <svg name="viewBox">
        <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip title={tooltipText} arrow  open={tooltipOpen} disableFocusListener disableHoverListener disableTouchListener onClose={handleTooltipClose}>
            <g name="node" className={!inserted ? "insertNode node" : "node"} id={node.id} onClick={handleTooltipOpen}>
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
        </ClickAwayListener>
       
        
        <g>

        {node.parent && <>
                
            {node.lr === "l" ? 
            
               <path id={`arrow${node.id}`} d={`M ${node.parent.x-13},${node.parent.y+13} L ${node.x+13},${node.y-13}`} style={{stroke: "green", strokeWidth: 2}}/>
            
            : <path id={`arrow${node.id}`} d={`M ${node.parent.x+13},${node.parent.y+13} L ${node.x-13},${node.y-13}`} style={{stroke: "green", strokeWidth: 2}}/>
            }

        </> 
        }
        </g>
        </svg>
        
        
        
        
    )
}