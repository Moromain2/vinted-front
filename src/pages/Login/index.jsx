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

    // Getting email value and pushing it into the user object
    const handleEmail = (e) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        newUser.email = input_value;
        setUser(newUser);
    }

    // Getting password value and pushing it into the user object
    const handlePassword = (e) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        newUser.password = input_value;
        setUser(newUser);
    }

    const navigate = useNavigate(); // Setting a navigate variable to the useNavigate function
    const [error, setError] = useState(false); // Setting a state to show an error modal if the login fails

    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing page reload on form submition
        try {
            // Post request via axios with the information sent in the form
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
                email: user.email,
                password: user.password,
            });
            const data = response.data;
            // Setting a user_token cookie to the return value of the API call
            Cookies.set("user_token", data.token, { expires: 14 });
            navigate("/"); // Redirection to the home page
        } catch (error) {
            setError(true);
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleEmail} type="email" name="email" id="email" placeholder="Adresse email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input onChange={handlePassword} type="password" name="password" id="password" placeholder="Mot de passe" required />
                    </div>
                    <input type="submit" />
                    {error &&
                        // If the error state is set to true
                        <div className="form-modal hidden">
                            <p>Aucun compte pour cet email ou mot de passe</p>
                        </div>
                    }
                </form>
            </div>
            <p>Vous n'avez pas de compte ? </p><Link to="/signup">Créez en un</Link>
        </div>
    )
}

export default LoginPage;