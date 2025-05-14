import { api } from "~/trpc/server";

import { auth } from "~/server/auth";

import HistoryWrapper from "./history-wrapper";
import { HistoryUserProps, HistoryUserWrapperProps } from "~/app/_types/types";

import histories from "./_dummy-history.json"

async function HistoryPage() {
    const session = await auth();

    const userId = session?.user.id;

    const data = await api.history.getHistoryByPatient({
        pasienId: userId || "",
    })

    if (data === undefined) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        )
    }

    const history: HistoryUserProps[] = data[0]?.history ?? [];

    // dummy data
    const parsedData: HistoryUserWrapperProps[] = histories.map(item => ({
        ...item,
        tanggal: new Date(item.tanggal),
      }));


    return (
        <div className="flex flex-col w-full h-screen">
        {parsedData.length !== 0 && 
            parsedData.map((item, index) => {
                return (
                    <HistoryWrapper
                        key={index}
                        tanggal={item.tanggal}
                        history={item.history}
                    />
                )
            })
        }
        </div>
    )
}

export default HistoryPage;