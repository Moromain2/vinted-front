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
        newsletter: true
    })

    // Function to collect the client's input : argument input_key has to be set to one of the form's value to be pushed to the matching key of the user object
    const handleInput = (e, input_key) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        if (input_key === "username") {
            newUser.username = input_value;
        } else if (input_key === "email") {
            newUser.email = input_value;
        } else if (input_key === "password") {
            newUser.password = input_value;
        }
        setUser(newUser);
    }

    const navigate = useNavigate(); // Setting a navigate variable to the useNavigate function

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
        <div className="signup-page-wrapper">
            <div className="container">
                <h1>Créer un compte</h1>
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
                    // If no user token is strored
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
                                <input onChange={(e) => handleInput(e, "password")} type="password" name="password" id="password" placeholder="Ab765Thq_xv90!=mAq" required />
                            </div>
                            <input className="button button-fill" type="submit" value="S'inscrire" />
                        </form>
                        <div className="hint">
                            <h4>Vous n'avez déjà un compte ? </h4>
                            <Link cla to="/login">Connectez vous ici</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SignUpPage;