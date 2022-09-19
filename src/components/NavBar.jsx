import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function NavBar() {
    const [openNavBar, setOpenNavBar] = useState(false);

    let navBarLinks = [
        {
            name: "About",
            to: "/about"
        },
        {
            name: "Source Code",
            to: "github.com"
        },
        {
            name: "Resources Used",
            to: "/resources"
        }
    ]

    return (
        <div className="shadow-md w-full fixed top-0 left-0 z-10">
            <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
                    <span className="text-3xl text-green-700 mr-1 pt-2">
                         <Link to="/" className="hover:text-green-800 duration-200">Quakewatch</Link>
                    </span>
                </div>

                <div className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden" onClick={() => setOpenNavBar(!openNavBar)}>
                    <ion-icon name={ openNavBar ? "close" : "menu" }></ion-icon>
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static 
                bg-[rgba(255,255,255,0.6)] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 backdrop-blur-sm transition-all duration-300 ease-in 
                ${openNavBar ? "top-20" : "top-[-490px]"}`}>
                    {
                        navBarLinks.map((navBarLink) => (
                            <li key={navBarLink.name} className="md:ml-8 text-xl md:my-0 my-7">
                                {
                                    navBarLink.name.toLowerCase() === "source code" 
                                    ? 
                                    <a className="hover:text-green-800 duration-200" href="https://github.com/sukaruta/Quakewatch/tree/master"> {navBarLink.name} </a>
                                    :
                                    <Link to={navBarLink.to} className="hover:text-green-800 duration-200">{navBarLink.name}</Link>   
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar;