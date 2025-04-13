import { api } from "~/trpc/server";

import { auth } from "~/app/api/auth/[...nextauth]/route";

import HistoryWrapper from "./history-wrapper";
import { HistoryUserProps } from "~/app/_types/types";

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
    return (
        <div className="flex flex-col w-full">
        {history.length !== 0 && 
            data.map((item, index) => {
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