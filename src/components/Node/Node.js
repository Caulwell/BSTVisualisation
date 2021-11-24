import {useContext, useEffect, useState} from "react";
import { Tooltip,ClickAwayListener } from "@mui/material";
import "./Node.css";

export default function Node({node, deleteNode}){

    const [inserted, setInserted] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
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

    const getColor = () => {
        if(node.colour){
            return node.colour;
        } else {
            return "#2d6a4f";
        }
    };

    const getTooltipContent = () => {
        return (
            <div className="node-tooltip">
            <div className="node-tooltip-info">{"Depth: " + node.getDepth()}</div>
            <div className="node-tooltip-info">{node.parent ? "Parent: " + node.parent.value  : "Parent: null"}</div>
            <div className="node-tooltip-info">{node.left ? "Left: " + node.left.value  : "Left: null"}</div>
            <div className="node-tooltip-info">{node.right ? "Right: " + node.right.value  : "Right: null"}</div>
            
            {node.type === "avl" && <>
                {(node.getBalanceFactor() >=0 || node.getBalanceFactor() < 0) && <div className="node-tooltip-info">Balance Factor: {node.getBalanceFactor()}</div>}
                {node.getHeight() >=0 && <div className="node-tooltip-info">Height: {node.getHeight()}</div>}
                </>
            }
            <div ><button className="tooltip-button button-warning" onClick={handleClick} name="deleteButton" size="small"  >Delete</button></div>
            </div>
        )

    }

    const tooltipText = getTooltipContent();

    const colour = getColor();

    return (
        <svg name="viewBox">
        <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip title={tooltipText} arrow  open={tooltipOpen} disableFocusListener disableHoverListener disableTouchListener onClose={handleTooltipClose}>
            <g name="node" className={!inserted ? "insertNode node" : "node"} id={node.id} onClick={handleTooltipOpen}>
            <circle 
                cx="20" 
                cy="20" 
                r="20" 
                stroke={colour} 
                strokeWidth="4" 
                fill="white"
                className={node.id}
                name={"node"+node.id}
               
            />
            <text className="svg-text" x="20" y="20"
                textAnchor="middle"
                stroke={colour}
                strokeWidth="1px"
                fill={colour}
                alignmentBaseline="middle"
                className={node.id}
            >
            {node.value}
            </text>
        </g>
        </Tooltip>
        </ClickAwayListener>
       
        
        <g>

        {node.parent && inserted && <>
                
            {node.lr === "l" ? 
            
               <path id={`arrow${node.id}`} d={`M ${node.parent.x-13},${node.parent.y+13} L ${node.x+13},${node.y-13}`} style={{stroke: "#2d6a4f", strokeWidth: 2}}/>
            
            : <path id={`arrow${node.id}`} d={`M ${node.parent.x+13},${node.parent.y+13} L ${node.x-13},${node.y-13}`} style={{stroke: "#2d6a4f", strokeWidth: 2}}/>
            }

        </> 
        }
        </g>
        </svg>
        
        
        
        
    )
}