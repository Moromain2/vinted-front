// Modules import
import { useState, useEffect } from 'react'; // State management
import axios from 'axios'; // Data fetching
import { Link } from "react-router-dom"; // Navigation

// CSS import for home page
import "./home-page.css";

// Components imports
import Loader from "../../components/Loader";
import OfferCard from "../../components/OfferCard";

const HomePage = (filter) => {

    // PAGINATION
    let offersToShow = 8; // Setting a variable for the amount of offers to show
    const [page, setPage] = useState(1); // Setting a state for the page variable

    const handlePagination = (action) => {
        if (page > 1 && action === "previous") {
            // If it's not the first page and we want to get the previous amount of offers to show
            setPage(page - 1);
        } else if (page < (data.count / offersToShow) && action === "next") {
            // If it's not the last page and we want to get the next amount of offers to show
            setPage(page + 1);
        }
    }

    // DATA FETCHING
    const [data, setData] = useState({}); // Declaring a state for the data object that will be set to the object sent by the API
    const [isLoading, setIsloading] = useState(true); // Declaring a loading state set to true that will be set to false once the data is loaded

    useEffect(() => { // Call of the fetchData function on the first render of the app comppnent
        const fetchData = async () => { // API call via Axios
            try {
                // Pagination data is dynamicaly passed to the url via page and offersToShow variables
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/offers?page=${page}&limit=${offersToShow}&title=${filter.title}&princeMin=${filter.priceMin}&priceMax=${filter.priceMax}&sort=${filter.sort}`);
                setData(response.data); // Data is set to axios response
                setIsloading(false); // Loadingg state is set to false after the axios response
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData(); // Function is called once the component has rendered
    }, [offersToShow, page, filter]); // Dependencies array


    return (
        <>
            {isLoading ? <Loader /> :
                // If the data has been fetched
                <>
                    <div className="page-wrapper home-page-wrapper">
                        <section id="hero">
                            <div className="container">
                                <div className="card hero-cta">
                                    <h1>Prêts à faire du tri dans vos placards ?</h1>
                                    <Link to="/publish" className="button button-fill">Commencer à vendre</Link>
                                </div>
                            </div>
                        </section>
                        <section id="products">
                            <div className="container">
                                <h2>Fil d'actu</h2>
                                <div className="grid">
                                    {data.offers.map((offer) => {
                                        return (
                                            <OfferCard key={offer._id} offer={offer} />
                                        )
                                    })}
                                </div>
                            </div>
                        </section >
                    </div >
                    <section id="navigation">
                        <div className="container">
                            <button onClick={() => { handlePagination("previous") }} className={page === 1 ? `button button-inactive` : `button button-inline`}>Précédent</button>
                            <span>Page {page} / {Math.ceil(data.count / offersToShow)}</span>
                            <button onClick={() => { handlePagination("next") }} className={page === Math.ceil(data.count / offersToShow) ? `button button-inactive` : `button button-inline`}>Suivant</button>
                        </div>
                    </section>
                </>

            }
        </>

    )
}

export default HomePage;