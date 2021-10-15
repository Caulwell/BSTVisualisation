

const API_URL = "http://localhost:4000/";


async function register(data){
    const response = await fetch(API_URL + "register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const body = await response.json();
    
    if(response.status !== 200) throw Error(body.message);
    return body;
}

async function login(data){
    const response = await fetch(API_URL + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);
    return body;
}

export {register, login};