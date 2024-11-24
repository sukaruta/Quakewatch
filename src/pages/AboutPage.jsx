import InfoBox from "../components/InfoBox";

function AboutPage() {
    return (
        <div className="mx-20 mt-36">
            <InfoBox headerText={"About The Developer"} paragraphText={"Hello! I created this website for my requirements for physics academics."}/>
            <div>
                <h1 className="font-bold text-4xl mb-5">About The Website</h1>
                <p className="text-lg mb-10">
                Quakewatch is a mixture of spaghetti made with <a href="https://reactjs.org/" className="text-blue-500 underline hover:text-blue-300 duration-200"> ReactJS </a> and <a href="https://tailwindcss.com/" className="text-blue-500 underline hover:text-blue-300 duration-200"> tailwindcss </a> for the front end, built into a webpack using <a href="https://vitejs.dev/" className="text-blue-500 underline hover:text-blue-300 duration-200"> Vite </a>.
                Quakewatch is a website designed to help people from all over the world have easier access to technologies that can help relieve people who are affected by earthquakes.
                </p>
            </div>
            <InfoBox headerText={"How do I use the website?"} paragraphText={"You can scroll down on the home page to see a list of recently happened earthquakes displayed to you. You can see details like where the earthquake took place on a globe, and how you can donate to help relief people affected by said earthquake."}/>
            <InfoBox headerText={"How will Quakewatch reduce the damage and casualties caused by earthquakes?"} paragraphText={"Though Quakewatch can't prevent earthquakes, it does aim to minimize damage and casualties through exposing more ways for people to donate and help earthquake relief organizations. Through the use of increased donations and exposure, places affected by earthquakes can bounce back quicker because they will have a lot of focus on them to rebuild and accommodate and help people affected by it."} />
            <InfoBox headerText={"The Website's Future"} paragraphText={"As the website currently stands, it is only still a prototype/shell of it's proposed features, a website that displays the location of earthquakes and gives you options to donate to relief people affected from said earthquakes. If you've noticed the Donate button does not work, that is simply because it is not implemented yet since it would be far too complex given my timeframe to do. I would have to run country region detection checks then evaluate organizations that do run earthquake donations to said country. That said, if this project ever regains momentum, I will probably release those proposed features."} />


            <p className="text-xs">Quakewatch has been acquired by D.A.M.M Innovations (unfortunately, bad business decisions from here on out)</p>
        </div>
    )
}

export default AboutPage;