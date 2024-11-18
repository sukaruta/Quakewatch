import { Link } from "react-scroll";

import ThreeCanvas from "../components/ThreeCanvas";
import Earthquakes from "../components/Earthquakes";

function HomePage() {
    return (
        <div>
            <div id="canvasContainer" className="h-[100vh] w-full">
                <ThreeCanvas />
            </div>

            <div className="h-[100vh] w-full flex">
                    <div className="h-full w-1/2 p-20">
                        <h1 className="font-bold text-4xl mb-5"> Welcome to <Link to="globeCanvas" smooth={true} duration={500} isDynamic={true} className="text-green-700 underline hover:cursor-pointer"> Quakewatch </Link> </h1>
                        <p>
                            Quakewatch is a website designed to help people from all over the world have easier access to technologies that can help relieve people who are affected by earthquakes. The technologies refered can be means of donation or volunteering (however these are still nonfunctional and will be added in a later update.) This project hopes to help more people learn about seismologic activity, recognize where they often happen and be more educated in the subject. As of now, the website currently pinpoints the coordinates of where earthquakes have happened depending on what displays on the latest reported earthquakes list. The list also has a color indicator, the rule of thumb here is that the darker or stronger the color, the higher the magnitude is. Have a test, hope you like it!
                        </p>
                    </div>
                    <div className="w-1/2 p-20">
                        <p className="text-xs m-0 italic">Only earthquakes above magnitude 5.5 from the last 30 days are considered significantly disasterous & timely.</p>
                        <div className="border-solid border-2 rounded-lg overflow-hidden overflow-y-scroll">
                            <Earthquakes />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default HomePage;