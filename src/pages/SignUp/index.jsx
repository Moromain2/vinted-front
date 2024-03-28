// Modules imports
import { useState } from "react"; // State management
import axios from 'axios'; // Data fetching
import { useNavigate } from "react-router-dom"; // Navigation
import Cookies from "js-cookie"; // Cookies

const SignUpPage = () => {

    // Setting a state for a new user and assigning its default value to an empty object with keys matching the sign up form
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        newsletter: true
    })

    // Getting username value and pushing it into the user object
    const handleUsername = (e) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        newUser.username = input_value;
        setUser(newUser);
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing page reload on form submit
        try {
            // Sending a post request to the API via axios with the user object
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
                username: user.username,
                email: user.email,
                password: user.password,
                newsletter: user.newsletter
            });
            const data = response.data;
            // Setting a user_token cookie to the return value of the API call
            Cookies.set("user_token", data.token, { expires: 14 });
            navigate("/"); // Redirection to the home page
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>
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
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Nom d'utilisateur <span>(requis)</span></label>
                            <input onChange={handleUsername} type="text" name="username" id="username" placeholder="Nom d'utilisateur" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email <span>(requis)</span></label>
                            <input onChange={handleEmail} type="email" name="email" id="email" placeholder="jean.dupont@gmail.com" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mot de passe <span>(requis)</span></label>
                            <input onChange={handlePassword} type="password" name="password" id="password" placeholder="Ab765Thq_xv90!=mAq" required />
                        </div>
                        <input type="submit" value="S'inscrire" />
                    </form>
                </div>
            }
        </div>
    )
}

export default SignUpPage;