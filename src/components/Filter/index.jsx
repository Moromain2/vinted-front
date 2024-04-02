import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// CSS import for component
import "./filter.css";

// Assets imports
import ManifyingGlass from "../../assets/images/vectors/ManifyingGlass";
import FilterIcon from "../../assets/images/vectors/FilterIcon";

const Filter = ({ filter, setFilter }) => {

    const [showFilters, setShowFilters] = useState(false);

    // Reseting the show filter state when the page changes
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState(location.pathname); // setting a state with the current pathname
    // Each time the component renders 
    useEffect(() => {
        // Hiding the menu if the location is diffent from the currentLocation
        if (location !== currentLocation) {
            setShowFilters(false);
        }
        // Updating the currentLocation state
        setCurrentLocation(location.pathname);
    }, [setCurrentLocation, currentLocation, location])

    const handleInput = (e, key) => {
        const filterClone = { ...filter };
        if (key === "price-desc" || key === "price-asc") {
            if (key === "price-desc") {
                filterClone.sort = "price-desc"
            } else {
                filterClone.sort = "price-asc"
            }
        } else {
            const input_value = e.target.value;
            filterClone[key] = input_value;
        }
        setFilter(filterClone);
    }

    return (
        <div className="filter-form">
            <form>
                <div className="search-bar-container">
                    <div className="search-input">
                        <ManifyingGlass />
                        <input onChange={(e) => { handleInput(e, "title") }} type="text" name="title" id="title" placeholder="Rechercher un article" />
                    </div>
                    <button onClick={(e) => { e.preventDefault(); setShowFilters(!showFilters) }} className="button button-fill">
                        <FilterIcon />
                        <span>Filtres</span>
                    </button>
                </div>
                {showFilters &&
                    <div className="filters-container">
                        <div>
                            <h3>Tranche de prix</h3>
                            <div className="price-range">
                                <div className="input-group">
                                    <label htmlFor="priceMin">Prix min.</label>
                                    <input onChange={(e) => { handleInput(e, "priceMin") }} type="number" name="priceMin" id="priceMin" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="priceMax">Prix max.</label>
                                    <input onChange={(e) => { handleInput(e, "priceMax") }} type="number" name="priceMax" id="priceMax" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Trier par</h3>
                            <div className="price-sort">
                                <div className="checkbox-group">
                                    <input onChange={(e) => { handleInput(e, "price-desc") }} type="radio" name="sort" id="sort" />
                                    <label htmlFor="sort">Prix décroissant</label>
                                </div>
                                <div className="checkbox-group">
                                    <input onChange={(e) => { handleInput(e, "price-asc") }} type="radio" name="sort" id="sort" />
                                    <label htmlFor="sort">Prix croissant</label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}

export default Filter;