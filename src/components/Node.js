
export default function Node({value}){

    return (
        <g>
            <circle cx="50" cy="50" r="20" stroke="green" strokeWidth="4" fill="white">
            </circle>
            <text x="50" y="50" 
                textAnchor="middle"
                stroke="red"
                strokeWidth="1px"
                
                alignmentBaseline="middle"
            >
            {value}
            </text>
        </g>
        
        
    )
}