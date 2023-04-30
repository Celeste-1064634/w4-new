const Login = () => {
    return (

        <div className="auto-container bg-light-grey">
            <div className="section">
                <h1 className="blue text-center">Inloggen</h1>
                <form className="form-container">
                    <label>E-mail</label>
                    <input className="custom-input" placeholder="email"></input>
                    <label>Wachtwoord</label>
                    <input className="custom-input" placeholder="wachtwoord"></input>
                    <input className="custom-submit" type="submit" value="Inloggen"></input>
                </form>
            </div>
        </div>


    )
};

export default Login;