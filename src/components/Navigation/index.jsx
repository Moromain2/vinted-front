import { Link } from "react-router-dom"

const Navigation = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/offer/template">Offer page</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;