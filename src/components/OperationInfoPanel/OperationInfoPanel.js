import { useState } from "react";
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
        }
    };


    const handleToggleOpen = () => {
        setOpen(!open);
    }


    return(
        <div className="operation-info-panel">
        <div className="operation-info-panel-title" onClick={handleToggleOpen}>
            {operation && getTitle() || "Selected Operation"}
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