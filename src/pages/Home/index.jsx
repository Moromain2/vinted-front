// CSS import for home page
import "./home-page.css";

// Components imports
import OfferCard from "../../components/OfferCard";

const HomePage = ({ data }) => {
    return (
        <div className="home-page-wrapper">
            <section id="hero">
                <div className="container">
                    <div className="card hero-cta">
                        <h1>Prêts à faire du tri dans vos placards ?</h1>
                        <button className="button button-fill">Commencer à vendre</button>
                    </div>
                </div>
            </section>
            <section id="products">
                <div className="container">
                    <h2>Fil d'actu</h2>
                    <div className="grid">
                        {data.offers.map((offer) => {
                            console.log(offer);
                            return (
                                <OfferCard key={offer._id} offer={offer} />
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>

    )
}

export default HomePage;