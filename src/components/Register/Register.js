import { Button, Form, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import validator from "validator";
import { UserContext } from "../../context/UserContext";

export default function Register({setAlert}){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [validated, setValidated] = useState(false);
    const [messages, setMessages] = useState({});
    const [error, setError] = useState("");

    const [userContext, setUserContext] = useContext(UserContext);


    const resetInputs = () => {
        setUsername("");
        setPassword("");
        setPassword2("");
    };
    


    const checkValidation = () =>{
        let messages1 = {};

        if(validator.isStrongPassword(password) && password === password2){
            setMessages({});
            setValidated(true);
        } else {
            if(!validator.isStrongPassword(password)){
                messages.password = ("Please enter a stronger password");
            }
    
            if(!password !== password2){
                messages1.password2 = ("These passwords do not match");
            }
    
            setMessages(messages1);
            setValidated(false);
        }  
        
    }

    


    const handleSubmit = e => {
            e.preventDefault();
            checkValidation();
            setError("");

            if(validated){

                fetch("http://localhost:4000/register", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
                })
                .then(async response => {
                    if(!response.ok){
                        if(response.status === 400){
                            setError("Please fill all the fields correctly");
                        } else if(response.status === 401){
                            setError("Invalid credentials");
                        } else if (response.status === 500){
                            setError("A user with the given username is already registered");
                            const data = await response.json();
                            setUserContext(oldValues => {
                                return {...oldValues, token:data.token};
                            });
                            
                        }
                    } else {
                        resetInputs();
                        setAlert({severity: "success", text: "You have successfully registered!"});
                    }
                })
                .catch(error => {
                    setError("Something went wrong. Please try again");
                });
                
            }    
    };


    return (

        
        <div>
            <h1>Register</h1>

            {error && <Alert variant="warning">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} required/>
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                    <Form.Text className="text-muted">
                        minimum length: 8, minimum lower-case: 1, minimum upper-case: 1, minimum numbers: 1, minimum symbols: 1
                    </Form.Text>
                    {messages.password && <div className="alert alert-danger" role="alert">
                        {messages.password}
                    </div>}
                </Form.Group>

                 <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" value={password2} onChange={e => setPassword2(e.target.value)} required/>
                    {messages.password2 && <div className="alert alert-danger" role="alert">
                        {messages.password2}
                    </div>}
                </Form.Group>


                <Button 
                    variant="primary" 
                    type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        
    )
}