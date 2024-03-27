// Modules imports
import { useState } from "react";
import { Link } from "react-router-dom"

// CSS import for Navigation
import "./navigation.css";

// Assets imports
import VintedLogo from "../../assets/images/vectors/VintedLogo";
import BurgerIcon from "../../assets/images/vectors/BurgerIcon";
import ArrowDown from "../../assets/images/vectors/ArrowDown";
import ManifyingGlass from "../../assets/images/vectors/ManifyingGlass";

const Navigation = () => {
    // Setting a state to hide or show menus on mobile
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header>
            <div className="mobile-header">
                <div className="container">
                    <Link to="/">
                        <VintedLogo className="header-logo" />
                    </Link>
                    <button className="menu-button" onClick={() => { setShowMenu(!showMenu) }}>
                        <BurgerIcon />
                    </button>
                </div>
            </div>
            <div className="search-box-container">
                <div className="container">
                    <div className="search-type">
                        <button className="search-type-selector" onClick={() => { setShowDropdown(!showDropdown) }}><span>Articles</span><ArrowDown /></button>
                        <ul className={showDropdown ? "search-type-list" : "search-type-list hide-dropdown"}>
                            <li>Articles</li>
                            <li>Membres</li>
                            <li>Centre d'aide</li>
                        </ul>
                    </div>
                    <div className="search-input">
                        <ManifyingGlass />
                        <form>
                            <input type="text" placeholder="Rechercher des articles" />
                        </form>
                    </div>
                </div>
            </div>
            <nav className={showMenu === false && "hide-menu-mobile"}>
                <div className="container">
                    <ul className="navlinks">
                        <li><Link to="/sign-up" className="button button-fill">S'inscrire | Se connecter</Link></li>
                        <li><Link to="/sign-up" className="button button-inline">Vends tes articles</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navigation;