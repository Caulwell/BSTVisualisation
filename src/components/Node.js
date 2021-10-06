
export default function Node({node}){

    return (
        <g>
            <circle cx={node.x} cy={node.y} r="20" stroke="green" strokeWidth="4" fill="white">
            </circle>
            <text x={node.x} y={node.y}
                textAnchor="middle"
                stroke="red"
                strokeWidth="1px"
                alignmentBaseline="middle"
            >
            {node.value}
            </text>
        </g>
        
        
    )
}