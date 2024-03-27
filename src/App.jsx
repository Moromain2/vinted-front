// Modules imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// Global CSS import
import './App.css'

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

  console.log(data);

  return (
    <>
      <h1>Vinted</h1>
    </>
  )
}

export default App
