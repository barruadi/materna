import { MenuBarUserProps } from "~/app/_types/types";

function MenuBarUser({
    activeOption, 
    setActiveOption
}: MenuBarUserProps) {

    return (
        <div className="w-3/4 rounded-full bg-[#FFF9C2] flex justify-between items-center relative">
            {/* Sliding background */}
            <div 
                className="absolute h-[100%] w-1/2 bg-[#FFD879] rounded-full transition-all duration-300 ease-in-out"
                style={{ 
                    transform: activeOption === "ibu" ? "translateX(0)" : "translateX(100%)",
                }}
            />
            
            {/* slider ibu */}
            <button
                className={`text-center w-1/2 my-4 z-10 transition-colors duration-300 font-bold
                    
                    `}
                onClick={() => setActiveOption("ibu")}
            >
                Ibu
            </button>

            {/* slider anak */}
            <button
                className={"text-center w-1/2 my-4 z-10 transition-colors duration-300 font-bold"}
                onClick={() => setActiveOption("anak")}
            >
                Anak
            </button>
        </div>
    )
}

export default MenuBarUser;