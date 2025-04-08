import { HistoryUserProps } from "~/app/_types/types";

import { RightOutlined } from '@ant-design/icons'

function HistoryUser({
    riwayatId,
    faskes, 
    nakes, 
    resiko
}: HistoryUserProps) {
    return (
        <div className="w-full pl-8 mx-4 bg-[#FFFCE1] rounded-[12px] mt-4 pt-4 relative overflow-hidden">
            <div className="absolute h-full w-1/12 bg-[#FFD879] rounded-full -inset-x-2 -inset-y-0 -z-1"></div>
            
            {/* fasilitas kesehatan */}
            <div className="font-semibold text-xl pb-2">
                {faskes}
            </div>

            {/* tenaga kesehatan */}
            <div className="w-full flex flex-col text-xs">
                Tenaga Kesehatan
                <div className="font-semibold text-xl pb-2">
                    {nakes}
                </div>
            </div>
            
            {/* Menu */}
            <div className="flex w-full justify-end">   

                {/* detail */}
                <button className="flex px-6 py-2 underline text-sm gap-2">
                    Detail <a href={`/pasien/history/detail/${riwayatId}`}><img src="/" alt="" /><RightOutlined /></a>
                </button>
            </div>

        </div>
    )
}

export default HistoryUser;