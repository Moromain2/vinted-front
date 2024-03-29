// CSS import for OfferCard component
import "./offer-card.css";

import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
    return (
        <Link to={`/offer/${offer._id}`}>
            <div className="offer-card">
                <div className="owner">
                    {offer.owner.account.avatar &&
                        <img src={offer.owner.account.avatar.secure_url} alt={offer.owner.account.username} />
                    }
                    <span>{offer.owner.account.username}</span>
                </div>
                <div className="product-image">
                    <img src={offer.product_image.secure_url} alt={offer.product_name} />
                </div>
                <div className="product-info">
                    <span className="price">{offer.product_price} €</span>
                    <ul className="details-list">
                        {offer.product_details.map((detail, index) => {
                            // Setting a dynamic key to display info in the details array
                            const detail_value = Object.keys(detail);
                            // If the key value is not empty
                            if (detail[detail_value[0]] !== "") {
                                return (
                                    <li key={index} className="detail">{detail[detail_value[0]]}</li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default OfferCard;