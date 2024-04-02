// Modules imports
import { useNavigate, Navigate, useLocation } from "react-router-dom";

// CSS import
import "./order-confirmed.css";

const OrderConfirmedPage = () => {
    // Page automaticaly redirects to the homepage after 5s
    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/");
    }, 5000)

    // After checkout form is submited, the title and amount of the article are passed through state
    const location = useLocation();

    // If state is defined, the page returns confirmation info
    return location.state ? (
        <div className="page-wrapper order-confirm-page-wrapper">
            <div className="container">
                <h1>Vous avez bien commandé l'article {location.state.title} pour {location.state.amount} €</h1>
                <p>Vous allez être redirigé vers la page d'accueil d'ici quelques secondes.</p>
            </div>
        </div>
    ) : (
        // If no state is defiined in the location, the page redirects to the homepage
        <Navigate to="/" />
    )
}

export default OrderConfirmedPage;