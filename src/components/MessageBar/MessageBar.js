import { useEffect, useState } from "react";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MessageBar({messages}){

    // useEffect(() => {
    //     setMessages(
    //         [
    //             {name: "Insert 10", decisions: ["10 < 18, check 18.left", "10 < 16, check 16.left", "10 > 8, check 8.right", "8.right is null, 8.right = 10"]},
    //             {name: "Insert 6", decisions: ["6 < 18, check 18.left", "6 < 16, check 16.left", "6 < 8, check 8.LEFT", "8.left is null, 8.right = 10"]},
    //             {name: "Insert 6", decisions: ["6 < 18, check 18.left", "6 < 16, check 16.left", "6 < 8, check 8.LEFT", "8.left is null, 8.right = 10"]},
    //             {name: "Insert 6", decisions: ["6 < 18, check 18.left", "6 < 16, check 16.left", "6 < 8, check 8.LEFT", "8.left is null, 8.right = 10"]},
    //         ]
    //     );
    // },[]);

    return (
        <div>
        <Accordion anchor="right" sx={{maxHeight: window.innerHeight-120, overflow: "auto", width: "300px"}}>  
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
                    <Accordion key={index}> 
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
                                    <Typography key={index}>{decision}</Typography>
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