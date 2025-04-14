import React from "react";
import { api } from "~/trpc/server";

async function DetailPage() {
    // const riwayatId = await props?.params?.then((params) => params.id);

    // const data = await api.history.getHistoryDetailById({
    //     id: riwayatId || "",
    // })
  
    // if (!riwayatId) {
    //     return <div>No data avaliable</div>;
    // }
  
    return (
        <div>
            <h1>Riwayat Detail</h1>
            <p>Riwayat ID: id</p>
        </div>
    );
};

export default DetailPage;