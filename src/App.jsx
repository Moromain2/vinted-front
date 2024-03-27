// Modules imports
import { useState, useEffect } from 'react'; // State management
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Navigation
import axios from 'axios'; // Data fetching

// Global CSS import
import './App.css'

// Pages components imports
import HomePage from './pages/Home';
import OfferPage from './pages/Offer';

// Components imports
import Navigation from "./components/Navigation";

function App() {

  // Data fetching
  const [data, setData] = useState({}); // Declaring a state for the data object that will be set to the object sent by the API
  const [isLoading, setIsloading] = useState(true); // Declaring a loading state set to true that will be set to false once the data is loaded

  const fetchData = async () => { // API call via Axios
    try {
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsloading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => { // Call of the fetchData function on when the app component renders
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? <p>Loading data...</p> : // If the data has not yet been fetched
        // If the data is fetched
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<HomePage data={data} />} />
            <Route path='/offer/:id' element={<OfferPage data={data} />} />
          </Routes>
        </Router>
      }

    </>
  )
}

export default App
