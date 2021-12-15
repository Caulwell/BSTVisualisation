import "./Converter.css";


export default function Converter({type, convertTree}){


    const handleClick = (e) => {
        convertTree(e.target.name);
    }

    const getButtons = () => {
        
        if(type === "bst"){
            return ["avl", "rb"];
        } else if(type === "avl"){
            return["bst", "rb"];
        } else {
            return["bst", "avl"];
        }
    };

    const buttons = getButtons();

    return(

        <div className="converter-panel">
            
            {buttons.map((button, index) => {
                return (
                    <button name={button} onClick={handleClick} key={index}>
                        {"Convert to " + button.toUpperCase()}
                    </button>
                )
            })}

           
    </div>


    )
}