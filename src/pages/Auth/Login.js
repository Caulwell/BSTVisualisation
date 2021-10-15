import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../util/auth";
import validator from "validator";

export default function Login(){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    


    const handleButtonPress = e => {
            e.preventDefault();
            login({
                username,
                password
            });
    }


    return (

        
        <div>
            <h1>Login</h1>

            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                 

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={handleButtonPress}>
                    Login
                </Button>
            </Form>
        </div>
        
    )
}