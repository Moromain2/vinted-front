// Modules imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Navigation

// Global CSS import
import './App.css'

// Pages components imports
import HomePage from './pages/Home';
import OfferPage from './pages/Offer';

// Components imports
import Navigation from "./components/Navigation";


function App() {

  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/offer/:id' element={<OfferPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
