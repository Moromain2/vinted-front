// CSS component import
import "./loader.css"

import LoaderIcon from "../../assets/images/vectors/LoaderIcon";

const Loader = () => {
    return (
        <div className="container loader-container">
            <div>
                <LoaderIcon />
                <h3>Chargement en cours...</h3>
            </div>
        </div>
    )
}

export default Loader;