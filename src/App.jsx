// Modules imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Navigation
import { useState } from "react";

// Global CSS import
import './App.css'

// Pages components imports
import HomePage from './pages/Home';
import OfferPage from './pages/Offer';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import PublishPage from './pages/Publish';
import PaymentPage from './pages/Payment';
import OrderConfirmedPage from './pages/OrderConfirmed';

// Components imports
import Navigation from "./components/Navigation";

function App() {

  // Filter state is defined in the app component to be sent to the components where its needed
  const [filter, setFilter] = useState({
    title: "",
    priceMin: 0,
    priceMax: 9999999,
    sort: undefined,
  })

  return (
    <>
      <Router>
        <Navigation filter={filter} setFilter={setFilter} /> {/* filter object and filter set function are passed to the navigation component since these values are needed in the filter component */}
        <Routes>
          <Route path='/' element={<HomePage {...filter} />} /> {/* filter object is passed as a prop to the homepage since we need its values to do the API call */}
          <Route path='/offer/:id' element={<OfferPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/publish' element={<PublishPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/order-confirmed' element={<OrderConfirmedPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
