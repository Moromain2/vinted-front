// CSS import for login page
import "./login.css";

// Modules imports
import { Link, useNavigate } from "react-router-dom"; // Navigation
import { useState } from "react"; // State management
import axios from 'axios'; // Data fetching
import Cookies from "js-cookie"; // Cookies

const LoginPage = () => {

    // Setting a state for a user and assigning its default value to an empty object with keys matching the login form
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // Function to collect the client's input : argument input_key has to be set to one of the form's value to be pushed to the matching key of the user object
    const handleInput = (e, input_key) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        if (input_key === "email") {
            newUser.email = input_value;
        } else if (input_key === "password") {
            newUser.password = input_value;
        }
        setUser(newUser);
    }

    const navigate = useNavigate(); // Setting a navigate variable to the useNavigate function
    const [error, setError] = useState(false); // Setting a state to show an error modal if the login fails

    // Function to send the user's info to the API that takes two arguments :
    // api_url : has to be set to the targeted API endpoint
    // object : has to be set to the object where the form's data has been pushed
    const handleSubmit = async (e, api_url, object) => {
        e.preventDefault(); // Preventing page reload on form submit
        try {
            // Sending a post request to the API via axios with the user object
            const response = await axios.post(api_url, object);
            const data = response.data;
            // Setting a user_token cookie to the return value of the API call
            Cookies.set("user_token", data.token, { expires: 14 });
            navigate("/"); // Redirection to the home page
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="page-wrapper login-page-wrapper">
            <div className="container">
                <h1>Se connecter</h1>
                {Cookies.get("user_token") !== undefined ?
                    // If a user token already exists
                    <div>
                        <p>You're already logged in</p>
                        <button onClick={() => {
                            Cookies.remove("user_token");
                            navigate("/signup");
                        }}>Log out</button>
                    </div>
                    :
                    <div className="card form-container">
                        <form onSubmit={(e) => { handleSubmit(e, `${import.meta.env.VITE_API_URL}/user/login`, user) }}>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={(e) => { handleInput(e, "email") }} type="email" name="email" id="email" placeholder="Adresse email" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input onChange={(e) => { handleInput(e, "password") }} type="password" name="password" id="password" placeholder="Mot de passe" required />
                            </div>
                            <input className="button button-fill" type="submit" />
                            {error &&
                                // {/* // If the error state is set to true */}
                                <div className="form-modal">
                                    <h3>Erreur</h3>
                                    <p>Aucun compte pour cet email ou mot de passe</p>
                                </div>
                            }
                        </form>
                        <div className="hint">
                            <h4>Vous n'avez pas de compte ? </h4>
                            <Link cla to="/signup">Créez en un ici</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginPage;