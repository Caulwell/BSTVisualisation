import { insertAnimation } from "../util/animations";
import {useEffect, useState} from "react";

export default function Node({node}){

    const [inserted, setInserted] = useState(false);

    useEffect(() => {
        console.log(node.parent);
        insertAnimation(node);
        setInserted(true);
    },[]);

    return (
        <svg>
            <g className={!inserted ? "insertNode" : undefined} id={node.id}>
            <circle 
                cx="20" 
                cy="20" 
                r="20" 
                stroke="green" 
                strokeWidth="4" 
                fill="white" 
                className={node.id}
            />
            <text x="20" y="20"
                textAnchor="middle"
                stroke="red"
                strokeWidth="1px"
                alignmentBaseline="middle"
                className={node.id}
            >
            {node.value}
            </text>
        </g>
        <g>

        {node.parent && <>
                
            {node.lr == "l" ? <line x1={node.parent.x-13} y1={node.parent.y+13} x2={node.x+13} y2={node.y-13} stroke="#000" strokeWidth="5" markerEnd="url(#arrow)" /> 
            
            : <line x1={node.parent.x+13} y1={node.parent.y+13} x2={node.x-13} y2={node.y-13} stroke="#000" strokeWidth="5" markerEnd="url(#arrow)" />}

        </> 
        }
        </g>
        </svg>
        
        
        
        
    )
}