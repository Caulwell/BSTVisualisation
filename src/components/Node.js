import { insertAnimation } from "../util/animations";
import {useEffect} from "react";

export default function Node({node}){

    useEffect(() => {
        insertAnimation(node);
    },[]);

    return (
        <g className="insertNode">
            {/* <circle cx={node.x} cy={node.y} r="20" stroke="green" strokeWidth="4" fill="white">
            </circle> */}
            <circle cx="20" cy="20" r="20" stroke="green" strokeWidth="4" fill="white" className={node.id}>
            </circle>
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
        
        
    )
}