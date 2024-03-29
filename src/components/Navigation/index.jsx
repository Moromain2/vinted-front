// Modules imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"; // Cookies

// CSS import for Navigation
import "./navigation.css";

// Assets imports
import VintedLogo from "../../assets/images/vectors/VintedLogo";
import BurgerIcon from "../../assets/images/vectors/BurgerIcon";
import CloseIcon from "../../assets/images/vectors/CloseIcon";
import ArrowDown from "../../assets/images/vectors/ArrowDown";
import ManifyingGlass from "../../assets/images/vectors/ManifyingGlass";

// Components imports
import Filter from "../Filter";


const Navigation = ({ filter, setFilter }) => {
    // Setting a state to hide or show items on mobile
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

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
            <div className="search-box-container">
                <div className="container">
                    {/* <div className="search-type">
                        <button className="search-type-selector" onClick={() => { setShowDropdown(!showDropdown) }}><span>Articles</span><ArrowDown /></button>
                        <ul className={showDropdown ? "search-type-list" : "search-type-list hide-dropdown"}>
                            <li><Link to="/">Articles</Link></li>
                            <li><Link to="/">Membres</Link></li>
                            <li><Link to="/">Centre d'aide</Link></li>
                        </ul>
                    </div>
                    <div className="search-input">
                        <ManifyingGlass />
                        <form>
                            <input type="text" placeholder="Rechercher des articles" />
                        </form>
                    </div> */}
                    {/* filter object and set filter function are passed through props from the app component */}
                    <Filter filter={filter} setFilter={setFilter} />
                </div>
            </div>
            <nav className={showMenu === false && "hide-menu-mobile"}>
                <div className="container">
                    <ul className="navlinks">
                        {Cookies.get("user_token") === undefined ?
                            <>
                                <li><Link to="/signup" className="button button-fill">S'inscrire</Link></li>
                                <li><Link to="/login" className="button button-inline">Se connecter</Link></li>
                            </>
                            :
                            <>
                                <li>Vous êtes connectés</li>
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