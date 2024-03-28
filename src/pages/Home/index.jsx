// Modules import
import { useState, useEffect } from 'react'; // State management
import axios from 'axios'; // Data fetching

// CSS import for home page
import "./home-page.css";

// Components imports
import OfferCard from "../../components/OfferCard";

const HomePage = () => {

    // Data fetching
    const [data, setData] = useState({}); // Declaring a state for the data object that will be set to the object sent by the API
    const [isLoading, setIsloading] = useState(true); // Declaring a loading state set to true that will be set to false once the data is loaded

    useEffect(() => { // Call of the fetchData function on when the app component renders
        const fetchData = async () => { // API call via Axios
            try {
                const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
                setData(response.data);
                setIsloading(false);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, []);

    console.log(data);

    // Pagination - WIP
    // let productsToShow = 6;

    // const [limit, setLimit] = useState(productsToShow); // Setting a state for the amount of offers to show defaults to 6
    // const [skip, setSkip] = useState(0);

    // const handlePagination = (action) => {
    //     console.log("BEFORE RENDER : ", "skip >>> ", skip, "limit >>> ", limit);
    //     if (action === "next-page" && limit < data.count) {
    //         setSkip(skip + productsToShow);
    //         setLimit(limit + productsToShow);
    //     } else if (action === "previous-page" && skip !== 0) {
    //         setSkip(skip - productsToShow);
    //         setLimit(limit - productsToShow);
    //     }
    // }
    // console.log("AFTER RENDER : ", "skip >>> ", skip, "limit >>> ", limit);

    // console.log(data.offers.slice(skip, limit));

    return (
        <>
            {isLoading ? <p>Loading data...</p> :
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
                                {/* {data.offers.slice(skip, limit).map((offer) => { */}
                                {data.offers.map((offer) => {
                                    return (
                                        <OfferCard key={offer._id} offer={offer} />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="container">
                            {/* WIP */}
                            {/* <br />
                            <br />
                            <br />
                            <button onClick={() => { handlePagination("previous-page") }}>Previous page</button>
                            <button onClick={() => { handlePagination("next-page") }}>Next page</button>
                            <br />
                            <br />
                            <br /> */}
                        </div>
                    </section >
                </div >

            }
        </>

    )
}

export default HomePage;