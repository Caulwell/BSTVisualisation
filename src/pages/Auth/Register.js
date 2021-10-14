import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function Register(){


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    function register(data){
        return fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => console.log(response));
    }


    const handleButtonPress = e => {
            e.preventDefault();

            register({
                username,
                email,
                password,
                password2
            })
    }


    return (

        
        <div>
            <h1>Register</h1>

            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                 <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" value={password2} onChange={e => setPassword2(e.target.value)}/>
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