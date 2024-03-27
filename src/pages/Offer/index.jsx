import { useParams } from "react-router-dom";

const OfferPage = () => {
    const { id } = useParams(); // Destructuration of params data
    return (
        <h1>Offer {id}</h1>
    )
}

export default OfferPage;