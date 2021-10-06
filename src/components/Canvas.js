import Node from "./Node";
export default function Canvas({nodes}){

    return (
        <svg width="800" height="500">
        {nodes.map(node => {
          return <Node key={node.value} node={node}/>
        })}
      </svg>
        
    )
}