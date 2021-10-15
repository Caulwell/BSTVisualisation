import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { register } from "../../util/auth";
import validator from "validator";

export default function Register(){


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [validated, setValidated] = useState(false);
    const [messages, setMessages] = useState({});


    const checkValidation = () =>{
        let messages1 = {};

        if(validator.isEmail(email) && validator.isStrongPassword(password) && password === password2){
            setMessages({});
            setValidated(true);
        } else {
            if(!validator.isEmail(email)){
                messages1.email = ("Please enter a valid email");
            }
    
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

    


    const handleButtonPress = e => {
            e.preventDefault();
            checkValidation();

            if(validated){
                register({
                    username,
                    email,
                    password
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                })
            }
            
    }


    return (

        
        <div>
            <h1>Register</h1>

            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} required/>
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    {messages.email && <div className="alert alert-danger" role="alert">
                        {messages.email}
                    </div>}
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
                    type="submit"
                    onClick={handleButtonPress}>
                    Submit
                </Button>
            </Form>
        </div>
        
    )
}