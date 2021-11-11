import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";


export default function Auth({setAlert}){



    return (
        <main>
             <Login setAlert={setAlert}/>
            <Register setAlert={setAlert}/>
        </main>
       
    )
}