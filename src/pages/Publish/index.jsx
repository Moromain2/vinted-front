// Modules imports
import Cookies from "js-cookie"; // Cookies
import { useNavigate, Navigate } from "react-router-dom"; // Navigation
import axios from 'axios'; // Data fetching
import { useState } from "react"; // State management
import Dropzone from 'react-dropzone' // Drag and drop files

const PublishPage = () => {
    // Setting a state to collect the offer data
    const [offer, setOffer] = useState({
        title: "",
        description: "",
        price: 0,
        condition: "",
        city: "",
        brand: "",
        size: undefined,
        color: "",
        picture: undefined
    })

    // Keys of the offer object are passed dynamicaly as arguments of the function
    const handleInput = (e, key) => {
        // Inout variable declaration and value assignement depending on the field type
        let input;
        if (key === "picture") {
            // If it's a file input
            input = e.target.files[0];
        } else {
            // If it's a text input
            input = e.target.value;
        }
        // Copy of the offer object
        let newOffer = { ...offer };
        // Keys of the object are dynamicaly assigned to the user's input values
        newOffer[key] = input;
        // State of the offer object is updated
        setOffer(newOffer);
        // console.log(offer);
    }

    // const [redirectUrl, setRedirectUrl] = useState(""); >>> REDIRECT TO OFFER PAGE AFTER SUBMITION

    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing page reload on form submit
        const offerKeys = Object.keys(offer);
        const formData = new FormData();
        for (let i = 0; i < offerKeys.length; i++) {
            formData.append(offerKeys[i], offer[offerKeys[i]]);
        }
        try {
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("user_token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            // setRedirectUrl(`/offer/${response.data._id}`); >>> REDIRECT TO OFFER PAGE AFTER SUBMITION
        } catch (error) {
            console.log(error.message);
        }
    }

    // const navigate = useNavigate(); >>> REDIRECT TO OFFER PAGE AFTER SUBMITION

    // Page content is only displayed if the user is authenticated
    return Cookies.get("user_token") ? (
        <div className="page-wrapper new-offer-page-wrapper">
            <div className="container">
                <h1>Poster une annonce</h1>
                <form onSubmit={(e) => {
                    handleSubmit(e);
                    // navigate(redirectUrl); >>> REDIRECT TO OFFER PAGE AFTER SUBMITION
                }} className="form-container">
                    <div className="input-group">
                        <label htmlFor="picture">Ajouter une image {`(requis)`}</label>
                        <input onChange={(e) => { handleInput(e, "picture") }} type="file" name="picture" id="picture" accept="image/png, image/jpeg, image/webp" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="title">Titre {`(requis)`}</label>
                        <input onChange={(e) => { handleInput(e, "title") }} type="text" name="title" id="title" placeholder="Votre titre" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description {`(requis)`}</label>
                        <textarea onChange={(e) => { handleInput(e, "description") }} type="text" name="description" id="description" rows={10} minLength={20} placeholder="Décrivez votre article">
                        </textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="price">Prix {`(requis)`}</label>
                        <input onChange={(e) => { handleInput(e, "price") }} type="number" name="price" id="price" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="condition">État</label>
                        <input onChange={(e) => { handleInput(e, "condition") }} type="text" name="condition" id="condition" placeholder="Neuf, très peu porté, légèrement usé..." />
                    </div>
                    <div className="input-group">
                        <label htmlFor="city">Ville</label>
                        <input onChange={(e) => { handleInput(e, "city") }} type="text" name="city" id="city" placeholder="Votre ville" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="brand">Marque</label>
                        <input onChange={(e) => { handleInput(e, "brand") }} type="text" name="brand" id="brand" placeholder="Marque de votre article" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="size">Taille</label>
                        <input onChange={(e) => { handleInput(e, "size") }} type="text" name="size" id="size" placeholder="Taille de votre article" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="color">Couleur</label>
                        <input onChange={(e) => { handleInput(e, "color") }} type="text" name="color" id="color" placeholder="Couleur de votre article" />
                    </div>
                    <input type="submit" value="Poster une annonce" />
                </form>
            </div>
        </div>
    ) : (
        // If the user is not authenticated, the page redirects to the login page
        <Navigate to="/login" />
    )
}

export default PublishPage;