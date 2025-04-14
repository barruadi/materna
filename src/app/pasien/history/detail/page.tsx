import { api } from "~/trpc/server";

async function DetailPage({
    searchParams,
}: {
    searchParams: { detail?: string };
}) {
    const riwayatId = searchParams.detail;

    const data = await api.history.getHistoryDetailById({
        id: riwayatId || "",
    })
  
    if (!riwayatId) {
        return <div>No data avaliable</div>;
    }
  
    return (
        <div>
            <h1>Riwayat Detail</h1>
            <p>Riwayat ID: {riwayatId}</p>
        </div>
    );
};

export default DetailPage;