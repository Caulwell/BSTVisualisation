import Node from "./Node";


export default function Canvas({nodes}){

    return (

        <svg width={window.innerWidth - 40} height="500">
            {nodes.map(node => {
            return <Node key={node.id} node={node} />
            })}
        </svg>

    )
}