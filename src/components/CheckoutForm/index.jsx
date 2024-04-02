// Modules imports
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js'; // Payment
import { useState } from 'react'; // State management
import axios from 'axios'; // API calls
import { Navigate, useNavigate } from 'react-router-dom'; // Navigation

// CSS import
import "./checkout-form.css"

// Props are dynamicaly passed by the payment page
const CheckoutForm = ({ title, amount }) => {

    // Variables assignment to stripe functions
    const stripe = useStripe();
    const elements = useElements();

    // Error message state
    const [errorMessage, setErrorMessage] = useState(null);

    // Loading state
    const [isLoading, setIsloading] = useState(false);

    // Payment state
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Setting the loading state to true when the form is submitted
        setIsloading(true);

        if (elements == null) {
            return;
        }

        // Destructuration of the error key on form submition and assignement to the submitError alias
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // Updating the error message state in case of an error
            setErrorMessage(submitError.message);
            return;
        }

        // Offer info object taking the values passed as props
        const offerInfo = {
            title: title,
            amount: amount
        }

        // API call to create the payment intent, response will send back the clientSecret
        const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/v2/payment", offerInfo);
        const clientSecret = response.data.client_secret;

        // Stripe request to validate payment
        const stripeResponse = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: "http://localhost:5173/order-confirmed" // Default development URL, redirection is handled through the OrderConfirmedPage at route /order-confirmed
            },
            // Prevents redirections
            redirect: "if_required",
        });

        // If an error occurs when the payment is being confirmed
        if (stripeResponse.error) {
            setErrorMessage(stripeResponse.error.message);
        }

        // If stripe response status is successfull
        if (stripeResponse.paymentIntent.status === "succeeded") {
            setPaymentCompleted(true);
        }

        // Setting the loading state to false when the payment has been processed
        setIsloading(false);
    }

    const navigate = useNavigate()
    if (paymentCompleted) {
        navigate("/order-confirmed", { state: { title: title, amount: amount } })
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <PaymentElement />
            <button className="button button-fill payment-button" disabled={!stripe || !elements || isLoading}>Payer</button>
            {errorMessage &&
                <div className="form-error">
                    {errorMessage}
                </div>
            }
        </form>
    )
}

export default CheckoutForm;