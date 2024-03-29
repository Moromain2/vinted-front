// CSS import for sign up page
import "./sign-up.css";

// Modules imports
import { useState } from "react"; // State management
import axios from 'axios'; // Data fetching
import { Link, useNavigate } from "react-router-dom"; // Navigation
import Cookies from "js-cookie"; // Cookies

const SignUpPage = () => {

    // Setting a state for a new user and assigning its default value to an empty object with keys matching the sign up form
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        newsletter: false
    })

    // Error message state set to an empty string : will be set to a string if an error occurs
    const [errorMessage, setErrorMessage] = useState("");

    // Function to collect the client's input : argument input_key has to be set to one of the form's value to be pushed to the matching key of the user object
    const handleInput = (e, input_key) => {
        // Error reset on input change
        setErrorMessage("");
        // Copy of the user object
        let newUser = { ...user };
        // Variable collecting the client's inputs
        const input_value = e.target.value;
        if (input_key === "username") {
            newUser.username = input_value;
        } else if (input_key === "email") {
            newUser.email = input_value;
        } else if (input_key === "password") {
            newUser.password = input_value;
        } else if (input_key === "newsletter") {
            newUser.newsletter = !newUser.newsletter;
        }
        setUser(newUser);
    }


    const navigate = useNavigate(); // Setting a navigate variable to the useNavigate function

    // Function to send the user's info to the API that takes two arguments :
    // api_url : has to be set to the targeted API endpoint
    // object : has to be set to the object where the form's data has been pushed
    const handleSubmit = async (e, api_url, object) => {
        e.preventDefault(); // Preventing page reload on form submit

        // Setting an error message if the password is less than 8 characters and stopping the function
        if (user.password.length <= 8) {
            setErrorMessage("Le mot de passe doit faire plus de 8 caractères");
            return;
        }

        try {
            // Sending a post request to the API via axios with the user object
            const response = await axios.post(api_url, object);
            const data = response.data;
            // Setting a user_token cookie to the return value of the API call
            Cookies.set("user_token", data.token, { expires: 14 });
            navigate("/"); // Redirection to the home page
        } catch (error) {
            console.log(error.message);
            // Setting the error message depending on the recived error
            if (error.message === "Request failed with status code 409") {
                setErrorMessage("Cet email est déjà pris");
            } else {
                setErrorMessage(`Une erreur est survenue : ${error.message}`);
            }
        }
    }

    return (
        <div className="page-wrapper signup-page-wrapper">
            <div className="container">
                {Cookies.get("user_token") !== undefined ?
                    // If a user token already exists
                    <>
                        <h1>Vous êtes déjà connecté</h1>
                        <button className="button button-danger" onClick={() => {
                            Cookies.remove("user_token");
                            navigate("/signup");
                        }}>Se déconnecter</button>
                    </>
                    :
                    // If no user token is strored
                    <>
                        <h1>Créer un compte</h1>
                        <div className="card form-container">
                            {/* Sign up API url and user object are set as arguments */}
                            <form onSubmit={(e) => { handleSubmit(e, `${import.meta.env.VITE_API_URL}/user/signup`, user) }}>
                                <div className="input-group">
                                    <label htmlFor="username">Nom d'utilisateur <span>(requis)</span></label>
                                    <input onChange={(e) => handleInput(e, "username")} type="text" name="username" id="username" placeholder="Nom d'utilisateur" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email <span>(requis)</span></label>
                                    <input onChange={(e) => handleInput(e, "email")} type="email" name="email" id="email" placeholder="jean.dupont@gmail.com" required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Mot de passe <span>(requis)</span></label>
                                    <input onChange={(e) => handleInput(e, "password")} type="password" name="password" id="password" placeholder="Ab765Thq_xv90!=mAq" autoComplete="on" required />
                                </div>
                                <div className="checkbox-group">
                                    <input onChange={(e) => handleInput(e, "newsletter")} type="checkbox" name="newseletter" id="newsletter" />
                                    <label htmlFor="newsletter">S'inscrire à la newsletter</label>
                                </div>
                                <input className="button button-fill" type="submit" value="S'inscrire" />
                            </form>
                            {errorMessage &&
                                <div className="form-error">
                                    <h3>Erreur</h3>
                                    <p>{errorMessage}</p>
                                </div>
                            }
                            <div className="hint">
                                <h4>Vous n'avez déjà un compte ? </h4>
                                <Link to="/login">Connectez vous ici</Link>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default SignUpPage;