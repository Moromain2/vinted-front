import "./offer-page.css";

import { useParams } from "react-router-dom";

const OfferPage = ({ data }) => {
    const { id } = useParams(); // Destructuration of params data

    // Loop through the offers array to find the offer with matching ID and setting it as the value of the current offer variable
    let current_offer;
    for (let i = 0; i < data.offers.length; i++) {
        if (data.offers[i]._id === id) {
            current_offer = data.offers[i];
        }
    }

    console.log(current_offer);

    return (
        <div className="offer-page-wrapper">
            <div className="container">
                <img className="offer-hero-image" src={current_offer.product_image.url} alt={current_offer.product_name} />
                <div className="card product-info">
                    <span className="price">{current_offer.product_price} €</span>
                    <ul className="details-list">
                        {current_offer.product_details.map((detail, index) => {
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
                        <h2>{current_offer.product_name}</h2>
                        <p>{current_offer.product_description}</p>
                    </div>
                    <div className="owner">
                        <img src={current_offer.owner.account.avatar.url} alt={current_offer.owner.account.username} />
                        <span>{current_offer.owner.account.username}</span>
                    </div>
                    <button className="button button-fill">Acheter</button>
                </div>
            </div>
        </div>
    )
}

export default OfferPage;