// Modules imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

// CSS import for offer page template
import "./offer-page.css";

const OfferPage = () => {
    const { id } = useParams(); // Destructuration of params data

    // Data fetching
    const [offer, setOffer] = useState({});
    const [isLoading, setIsloading] = useState(true);

    const fetchData = async () => { // API call via Axios with the offer's id
        try {
            const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`);
            setOffer(response.data);
            setIsloading(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => { // Call of the fetchData function when the page renders
        fetchData();
    });

    if (isLoading === true) { // If the data has not yet been fetched
        return (
            <div className="container">
                <p>Loading...</p>
            </div>
        )
    } else {
        // If the data is fetched
        return (
            <div className="offer-page-wrapper">
                <div className="container">
                    <img className="offer-hero-image" src={offer.product_image.url} alt={offer.product_name} />
                    <div className="card product-info">
                        <span className="price">{offer.product_price} €</span>
                        <ul className="details-list">
                            {offer.product_details.map((detail, index) => {
                                // Setting a dynamic key to collect all the data in the array
                                const detail_value = Object.keys(detail);
                                return (
                                    <li key={index}>
                                        <span className="detail-key">{detail_value[0]} : </span>
                                        <span className="detail-value">{detail[detail_value[0]]}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="description">
                            <h2>{offer.product_name}</h2>
                            <p>{offer.product_description}</p>
                        </div>
                        <div className="owner">
                            <img src={offer.owner.account.avatar.url} alt={offer.owner.account.username} />
                            <span>{offer.owner.account.username}</span>
                        </div>
                        <button className="button button-fill">Acheter</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default OfferPage;