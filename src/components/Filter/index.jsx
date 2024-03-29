import { useState } from "react";

// CSS import for component
import "./filter.css";

const Filter = ({ filter, setFilter }) => {

    const [showFilters, setShowFilters] = useState(false);

    const handleInput = (e, key) => {
        const filterClone = { ...filter };
        if (key === "price-desc" || key === "price-asc") {
            const input_value = e.target.checked;
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
                <label htmlFor="title"><h3>Rechercher un article</h3></label>
                <div className="input-group search-article">
                    <input onChange={(e) => { handleInput(e, "title") }} type="text" name="title" id="title" />
                </div>
                <button onClick={(e) => { e.preventDefault(); setShowFilters(!showFilters) }} className="button button-fill">Filtres</button>
                {showFilters &&
                    <div className="filters">
                        <h3>Tranche de prix</h3>
                        <div className="price-range">
                            <div className="input-group">
                                <label htmlFor="priceMin">Prix minmum</label>
                                <input onChange={(e) => { handleInput(e, "priceMin") }} type="number" name="priceMin" id="priceMin" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="priceMax">Prix maximum</label>
                                <input onChange={(e) => { handleInput(e, "priceMax") }} type="number" name="priceMax" id="priceMax" />
                            </div>
                        </div>
                        <h3>Trier par</h3>
                        <div className="price-sort">
                            <div className="checkbox-group">
                                <label htmlFor="sort">Prix décroissant</label>
                                <input onChange={(e) => { handleInput(e, "price-desc") }} type="radio" name="sort" id="sort" />
                            </div>
                            <div className="checkbox-group">
                                <label htmlFor="sort">Prix croissant</label>
                                <input onChange={(e) => { handleInput(e, "price-asc") }} type="radio" name="sort" id="sort" />
                            </div>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}

export default Filter;