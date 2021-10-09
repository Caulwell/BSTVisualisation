import { insertAnimation } from "../../util/animations";
import {useEffect, useState} from "react";

export default function Node({node}){

    const [inserted, setInserted] = useState(false);

    useEffect(() => {
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
        
        <g id={`arrow${node.id}`}>

        {node.parent && <>
                
            {node.lr == "l" ? 
            
               <path d={`M ${node.parent.x-13},${node.parent.y+13} L ${node.x+13},${node.y-13}`} style={{stroke: "green", strokeWidth: 2}}/>
            
            : <path d={`M ${node.parent.x+13},${node.parent.y+13} L ${node.x-13},${node.y-13}`} style={{stroke: "green", strokeWidth: 2}}/>
            }

        </> 
        }
        </g>
        </svg>
        
        
        
        
    )
}