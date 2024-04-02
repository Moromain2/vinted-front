import { useNavigate, useLocation } from "react-router-dom";

const OrderConfirmedPage = () => {
    // Page automaticaly redirects to the homepage after 5s
    // const navigate = useNavigate();
    // setTimeout(() => {
    //     navigate("/");
    // }, 5000)

    const location = useLocation();
    console.log(location);

    return (
        <>
            <div className="page-wrapper order-confirm-page-wrapper">
                <div className="container">
                    <h1>Votre article est bien commandé</h1>
                    <p>Vous allez être redirigé vers la page d'accueil d'ici quelques secondes.</p>
                </div>
            </div>
        </>
    )
}

export default OrderConfirmedPage;