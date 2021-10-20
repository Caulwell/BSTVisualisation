import { Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { login } from "../../util/auth";
import { UserContext } from "../../context/UserContext";

export default function Login(){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    


    const handleSubmit = e => {
            e.preventDefault();
            setSubmitting(true);
            setError("");

            fetch("http://localhost:4000/login", {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            })
            .then(async response => {
                setSubmitting(false);
                if(!response.ok){
                    if(response.status === 400){
                        setError("Please fill all the fields correctly");
                    } else if(response.status === 401){
                        setError("Invalid credentials");
                    } else {
                        setError("Something went wrong. Please try again");
                    }
                } else {
                    const data = await response.json();
                    setUserContext(oldValues => {
                        return {...oldValues, token: data.token}
                    });
                }
            })
            .catch(err => {
                setSubmitting(false);
                setError("Something went wrong. Please try again");
            });
    }


    return (

        
        <div>
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
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
                    disabled={submitting}>
                    Login
                </Button>
            </Form>
        </div>
        
    )
}