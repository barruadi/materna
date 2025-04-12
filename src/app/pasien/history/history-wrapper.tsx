"use client"

import { useState } from "react";

import HistoryUser from "~/app/_components/user/history-user";

import { HistoryUserWrapperProps } from "~/app/_types/types";

import { dummyHistoryUserWrapperData } from "~/app/_data/dummy";

const HistoryWrapper = ({
    tanggal,
    history
}: HistoryUserWrapperProps) => {
    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    };

    return (
        <>
            <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-400 rounded-full mr-2"></div>
                <h2 className="text-lg font-semibold">    
                    {formatDate(tanggal)}
                </h2>
            </div>
            <div className="">
                {history.map((history, index) => (
                    <HistoryUser 
                        key={index} 
                        riwayatId={history.riwayatId}
                        faskes={history.faskes} 
                        nakes={history.nakes} 
                        resiko={history.resiko} 
                    />
                ))}
            </div>
        </>
    )
}

export default HistoryWrapper;