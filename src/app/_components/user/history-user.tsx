interface HistoryUserProps {
    faskes: string;
    nakes: string;
    resiko: string;

}


function HistoryUser({faskes, nakes, resiko}: HistoryUserProps) {
    return (
        <div className="w-full px-8 ml-4 mr-4 bg-[#FFFCE1] rounded-[12px] mt-6 py-6 relative overflow-hidden">
            <div className="absolute h-full w-1/12 bg-[#FFD879] rounded-full -inset-x-2 -inset-y-0 -z-1"></div>
            
            {/* fasilitas kesehatan */}
            <div className="font-bold text-2xl pb-3">
                {faskes}
            </div>

            {/* tenaga kesehatan */}
            <div className="w-full flex flex-col">
                Tenaga Kesehatan
                <div className="font-bold text-xl pb-3">
                    {nakes}
                </div>
            </div>

            {/* Menu */}
            <div className="flex w-full justify-between">

                {/* detail */}
                <button className="flex px-6 py-2 bg-[#FFD879] font-bold rounded-full">
                    Detail <a href="/todata"><img src="/" alt="" /></a>
                </button>
            </div>

        </div>
    )
}

export default HistoryUser;