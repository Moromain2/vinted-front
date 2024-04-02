// Modules imports
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import Cookies from "js-cookie"; // Cookies

// CSS import for Navigation
import "./navigation.css";

// Assets imports
import VintedLogo from "../../assets/images/vectors/VintedLogo";
import BurgerIcon from "../../assets/images/vectors/BurgerIcon";
import CloseIcon from "../../assets/images/vectors/CloseIcon";

// Components imports
import Filter from "../Filter";


const Navigation = ({ filter, setFilter }) => {
    // Setting a state to hide or show items on mobile
    const [showMenu, setShowMenu] = useState(false);

    // Reseting the show menu state when the page changes
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState(location.pathname); // setting a state with the current pathname
    // Each time the component renders 
    useEffect(() => {
        // Hiding the menu if the location is diffent from the currentLocation
        if (location !== currentLocation) {
            setShowMenu(false);
        }
        // Updating the currentLocation state
        setCurrentLocation(location.pathname);
    }, [setCurrentLocation, currentLocation, location])

    const navigate = useNavigate(); // Setting a navigate variable to the useNavigate function

    return (
        <header>
            <div className="mobile-header">
                <div className="container">
                    <Link to="/">
                        <VintedLogo className="header-logo" />
                    </Link>
                    <button className="menu-button" onClick={() => { setShowMenu(!showMenu) }}>
                        {!showMenu ? <BurgerIcon /> : <CloseIcon />}
                    </button>
                </div>
            </div>
            {/* filter object and set filter function are passed through props from the app component */}
            <Filter filter={filter} setFilter={setFilter} />
            <nav className={!showMenu ? "hide-menu-mobile" : ""}>
                <div className="container">
                    <ul className="navlinks">
                        <li><Link to="/publish" className="button button-fill">Poster une annonce</Link></li>
                        {Cookies.get("user_token") === undefined ?
                            <>
                                <li><Link to="/signup" className="button button-fill">S'inscrire</Link></li>
                                <li><Link to="/login" className="button button-inline">Se connecter</Link></li>
                            </>
                            :
                            <>
                                <li>
                                    <button
                                        onClick={() => {
                                            Cookies.remove("user_token");
                                            navigate("/signup");
                                        }}
                                        className="button button-danger">
                                        Se déconnecter
                                    </button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navigation;