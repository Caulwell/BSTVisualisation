import { useState } from "react";
import shortid from "shortid";

import "./MessageBar.css";

export default function MessageBar({messages}){

    const [open, setOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState("");
    
    const handleClick = () => {
        setOpen(open => !open);
        setMessageOpen("");
    };

    const Operation = ({message, open, setMessageOpen}) => {

        const handleClick = () => {
            if(message.id === messageOpen){
                setMessageOpen("");
            } else {
                setMessageOpen(message.id);
            }
        };

        return (
            <div className="message-bar-item"  >
                <div className={messageOpen === message.id ? "selectedMessage message-bar-item-title" : "message-bar-item-title"} onClick={handleClick}>
                {message.name}
                </div>
                   
                    {open && 
                        <div className="message-bar-operation-content">
                            {message.decisions.map((decision, index) => {
                                return (
                                    <div key={shortid.generate()} className="message-bar-decision">
                                        {decision}
                                    </div>
                                )
                            })}
                        </div>
                    }
            </div>
        )
    }

    return (
        <div className="message-bar" >
            <div className="dropdown-control" onClick={handleClick}>
                Operations History
            </div>
        {open && 
            <div className="message-bar-content">
            {messages.map((message, index) => {
                return (
                    <Operation 
                        message={message} 
                        key={message.id}
                        open={messageOpen === message.id ? true : false} 
                        messageOpen={messageOpen}
                        setMessageOpen={setMessageOpen}
                    />
                )
            })}
            </div>
        }
        </div>
       
    )
}