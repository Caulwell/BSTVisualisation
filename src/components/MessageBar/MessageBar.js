import { useEffect, useState } from "react";
import shortid from "shortid";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MessageBar({messages}){

    useEffect(() => {
        console.log("re rendering whole bar");
    },[]);

    return (
        <div >
        <Accordion className="message-bar" anchor="right" sx={{maxHeight: window.innerHeight-120, overflow: "auto", width: "300px"}}>  
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="messages-content"
            id="messages-header"
        >
            <Typography>Operations</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {messages.map((message, index) => {

                return (
                    <Accordion key={shortid.generate()}> 
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`operation${index}-content`}
                            id={`operation${index}-header`}
                        >
                        <Typography>{message.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {message.decisions.map((decision, index) => {
                                return (
                                    <Typography key={shortid.generate()}>{decision}</Typography>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </AccordionDetails>
        </Accordion>

        </div>
       
    )
}