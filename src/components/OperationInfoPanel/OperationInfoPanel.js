import shortid from "shortid";
import "./OperationInfoPanel.css";


export default function OperationInfoPanel({operation, open, setOpen}){

    const getTitle = () => {
        switch(operation.type){
            case "insert":
                return "Inserting " + operation.name;
            case "delete":
                return "Deleting " + operation.name;
            case "traversal":
                return operation.name + " Traversal";
            case "search":
                return "Searching For " + operation.name;
            case "get":
                return "Get " + operation.name + " Node";  
            default:
                return;
        }
    };


    const handleToggleOpen = () => {
        setOpen(!open);
    }


    return(
        <div className="operation-info-panel">
        <div className="operation-info-panel-title" onClick={handleToggleOpen}>
            {(operation && getTitle()) || "Selected Operation"}
            <svg className="svg-arrow" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                        {open ? <path xmlns="http://www.w3.org/2000/svg" d="M11.646 15.146L5.854 9.354a.5.5 0 01.353-.854h11.586a.5.5 0 01.353.854l-5.793 5.792a.5.5 0 01-.707 0z"/>  : <path xmlns="http://www.w3.org/2000/svg" d="M12.354 8.854l5.792 5.792a.5.5 0 01-.353.854H6.207a.5.5 0 01-.353-.854l5.792-5.792a.5.5 0 01.708 0z"/>}
                    </svg>
        </div>
        <div className="operation-info-panel-content">
            {open && operation &&  operation.decisions.map((decision, index) => {
                    return (
                        <div key={shortid.generate()} className="operation-decision">
                            {decision}
                        </div>
                    )
            })}
        </div>
            
        </div>
    )
}