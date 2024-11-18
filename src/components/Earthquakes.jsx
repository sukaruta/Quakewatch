import { useState, useEffect } from "react";
import axios from "axios";

import EarthquakeItem from "./EarthquakeItem";
import { trigger } from "../libs/Event";

function Earthquakes(props) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ earthquakes, setEarthquakes ] = useState([]);

    let returnJSX = <div className="justify-center flex">
        <svg className="animate-spin" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" fill="#212121"/>
        </svg>
        <p> Loading... </p>
    </div>;

    useEffect(() => {
        setIsLoading(true);
        if (earthquakes.length == 0) getEarthquakesList();

        function getEarthquakesList() {
            const options = {
                method: 'GET',
                url: `https://everyearthquake.p.rapidapi.com/significant_month.json`,
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                    'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.co'
                }
            };
        
            axios.request(options)
            .then((response) => {
                setEarthquakes(response.data.data); 
                trigger("earthquakeListResponse");
                setIsLoading(false);
            })
            .catch((rejectReason) => {
                returnJSX = <p className="text-red-700"> Failed to fetch earthquake list. Status code: {rejectReason.status} </p>
                trigger("earthquakeListResponse");
                setIsLoading(false);
            });
        }
    }, [props]);

    if (isLoading) return returnJSX;

    return (
        <ul className="flex-col">
            {
                earthquakes.length > 0 ? 
                earthquakes.sort((a, b) => a.magnitude - b.magnitude).map((earthQuake) => (
                    <li key={earthQuake.id}>
                        <EarthquakeItem 
                            location={earthQuake.location} 
                            magnitude={earthQuake.magnitude}
                            magnitudeType={earthQuake.magType}
                            longitude={earthQuake.longitude}
                            latitude={earthQuake.latitude}
                            />
                    </li>)) : <p> I refuse to believe there hasn't been a magnitude 5.5 earthquake in the past month. Is the API broken again? </p>
            }
        </ul>
    )

}

export default Earthquakes;