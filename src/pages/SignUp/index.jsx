// Modules imports
import { useState } from "react";
import axios from 'axios';

const SignUpPage = () => {

    // Setting a state for a new user and assigning its default value to an empty object with keys matching the login form
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        newsletter: true
    })

    const handleUsername = (e) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        newUser.username = input_value;
        setUser(newUser);
    }

    const handleEmail = (e) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        newUser.email = input_value;
        setUser(newUser);
    }

    const handlePassword = (e) => {
        let newUser = { ...user };
        const input_value = e.target.value;
        newUser.password = input_value;
        setUser(newUser);
    }

    console.log(user);

    const [userToken, setUserToken] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
                username: user.username,
                email: user.email,
                password: user.password,
                newsletter: user.newsletter
            });
            const data = response.data;
            console.log(data);
            setUserToken(data.token);
        } catch (error) {
            console.log(error.message);
        }

    }

    console.log("user token >>> ", userToken);

    return (
        <div className="container">
            <h1>Sign Up</h1>

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

        </div>
    )
}

export default SignUpPage;