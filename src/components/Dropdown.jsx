import { useEffect, useState } from "react";

import { on } from "../libs/Event";

function Dropdown({ selected, setSelected }) {
    const [isActive, setIsActive] = useState(false);
    const [ isInteractable, setIsInteractable ] = useState(false);

    useEffect(() => {
        on("earthquakeListResponse", () => setIsInteractable(true));
    }, []);

    const options = ["Today", "Significant"]
    return (
        <div className="w-full select-none m-[20px_auto] relative">
            <div className={`p-[15px_20px] bg-white shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)] 
            font-bold ${ isInteractable ? "text-[#333] hover:bg-[#f4f4f4]" : "text-gray-300 hover:cursor-not-allowed" } flex items-center justify-between cursor-pointer duration-150 border-2`} 
            onClick={() => { if (!isInteractable) return; setIsActive(!isActive) }}> 
                {selected} 
            </div>
            {
                isActive && (
                    <div className="t-[110%] left-0 p-[10px] bg-white shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)] font-[500] text-[#333] w-[95%]">
                        {
                            options.map((option) => (
                                <div key={option} className="p-[10px] hover:bg-[#f4f4f4] duration-150" onClick={(e => {
                                    if (!isInteractable) return;
                                    setSelected(e.target.textContent);
                                    setIsActive(false);
                                    setIsInteractable(false);
                                })}> {option} </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Dropdown;