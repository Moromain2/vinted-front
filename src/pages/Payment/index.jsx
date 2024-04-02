// CSS import
import "./payment-page.css"

// Modules imports
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from '@stripe/stripe-js'; // Payment
import { Elements } from '@stripe/react-stripe-js'; // Payment

// Components imports
import CheckoutForm from "../../components/CheckoutForm";

// Stripe API connexion
const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");


const PaymentPage = () => {
    // Getting the current location 
    const location = useLocation();
    // Destructuring title and amount from state
    const { title, amount } = location.state

    // Stripe config
    const options = {
        mode: 'payment',
        amount: Number((amount * 100).toFixed(0)), // Tranforming the amount value passed through the location state and converting it to cents
        currency: 'eur'
    };

    // Page is displayed only if the user is authenticated
    return Cookies.get("user_token") ? (
        <div className="page-wrapper payment-page-wrapper">
            <div className="container">
                <div className="form-container">
                    <h1>Paiement</h1>
                    <h3>Rappel de la commande :</h3>
                    <ul className="order-summary">
                        <li><strong>Article :</strong> {title}</li>
                        <li><strong>Prix :</strong> {amount} €</li>
                    </ul>
                </div>
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm title={title} amount={amount} /> {/* title and amount from the useLocation are passed as props to the checkout form component */}
                </Elements>
            </div>
        </div>
    ) : (
        // If the user is not authenticated, this route redirects automaticaly to the login page
        <Navigate to="/login" />
    )
}

export default PaymentPage;