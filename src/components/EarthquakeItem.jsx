import { Link } from "react-scroll";

import { trigger } from "../libs/Event";

function EarthquakeItem(props) {
    function getColorIndicator() {
        let magnitude = new Number(props.magnitude);

        if (magnitude <= 2.4) return "bg-green-500";
        else if (magnitude >= 2.5 && magnitude <= 5.4) return "bg-green-700";
        else if (magnitude >= 5.5 && magnitude <= 6.0) return "bg-yellow-300";
        else if (magnitude >= 6.1 && magnitude <= 6.9) return"bg-amber-400";
        else if (magnitude >= 7.0 && magnitude <= 7.9) return "bg-amber-600";
        else if (magnitude > 8.0) return "bg-red-800";
        else return "bg-gray-400";

    }

    function handleClick() {
        trigger("geoLocationRequest", props);
    }

    return (
        <div className="p-5">
            <div className="flex justify-between border-b-2">
                <div className={`${getColorIndicator()} h-2 w-2 rounded-[50%]`} />
                <h1> {props.location} </h1>

                <div>
                <button className="border rounded p-1 bg-green-600 text-white hover:bg-green-700 duration-200">
                    <Link to="globeCanvas" smooth={true} duration={500} isDynamic={true} onClick={() => handleClick()}>
                        See More
                    </Link>
                </button>
                <button className="border rounded p-1 bg-yellow-600 text-white hover:bg-yellow-700 duration-200"> 
                    Donate 
                </button>
                </div>
            </div>

            <div className="flex text-gray-500 text-xs justify-evenly">
                <p> Mag: {props.magnitude} </p>
                <p> Mag Type: {props.magnitudeType} </p>
                <p> Long: {props.longitude} </p>
                <p> Lat: {props.latitude} </p>
            </div>
        </div>
    )
}

export default EarthquakeItem;