import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const { user, setUser } = useContext(UserContext)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("test")

        let info = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }

        try {
            const res = await fetch("/token", info)
            console.log(res)
            const data = await res.json()
            if (res.status !== 200) {
                console.log("Something went wrong")
                // setError(res)
                console.log("test", data)
                return false
            }
            
            // const data = await res.json()
            console.log("DATA: ", data)
            sessionStorage.setItem("token", data.access_token)
            setEmail('')
            setPassword('')
            setUser(data.access_token)
        }
        catch (error) {
            console.log("AWAIT", error)
        }


        // fetch("/token", info)
        //     .then(res => {
        //         console.log(res)
        //         if (res.status === 200) {
        //             return res.json()
        //         }
        //         else {
        //             console.log("Something went wrong")
        //             return
        //         }
        //     })
        //     .then(data => {
        //         console.log("DATA: ", data)
        //         sessionStorage.setItem("token", data.access_token)
        //         setEmail('')
        //         setPassword('')
        //         setUser(data.access_token)
        //     })
        //     .catch(error => {
        //         console.error("FETCH ERROR:", error)
        //     })
    }
    return (

        <div className="auto-container bg-light-grey">
            <div className="section">
                <h1 className="blue text-center">Inloggen</h1>
                {user && user != "" && user != undefined
                    ?
                    "Logged in with " + user
                    :
                    <form className="form-container" onSubmit={handleSubmit}>
                        <p>{error}</p>
                        <label>E-mail</label>
                        <input className="custom-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
                        <label>Wachtwoord</label>
                        <input className="custom-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="wachtwoord"></input>
                        <input className="custom-submit" type="submit" value="Inloggen"  ></input>
                    </form>
                }
            </div>
        </div>


    )
};

export default Login;