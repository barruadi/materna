import React from 'react';
import ResikoDesktop from './resiko-desktop';

interface TableDesktopProps {
    data: Record<string, any>[];
}

export default function TableDesktop({data}: TableDesktopProps) {

    const columns = [
        {key: 'id', label: "NIK"},
        {key: 'name', label: "Nama Pasien"},
        {key: 'usiaKehamilan', label: "Usia Kehamilan"},
        {key: 'status', label: "Status Resiko"},
        {key: 'ket', label: "Keterangan"},
    ]

    return(
        <div className='overflow-x-auto p-5'>
            <table className='min-w-full border bg-white rounded-xl overflow-auto'>
                {/*Table Header*/}
                <thead>
                    <tr className='bg-[#FFF9C2] text-center'>
                        {columns.map((col, index) => (
                            <th key={index} className='px-4 py-6 border-y-2'>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/*Table Body*/}
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className='hover:bg-gray-100 text-center'>
                            {columns.map((col) => (
                                <td key={col.key} className='px-4 py-4 border-y-[1px] place-items-center'>
                                    {col.key === 'status' ? (
                                        <ResikoDesktop idResikoPasien={row[col.key]}/>
                                    ) : col.key === 'ket' ? (
                                        <button className='flex bg-[#41C7D0] px-6 py-2 rounded-xl text-white hover:bg-cyan-600'>
                                            Detail <a href='/todata'><img src='/right-arrow.svg' className='pl-1 w-6 h-6' alt='detail-button'/></a>
                                        </button>
                                    ) : (
                                        row[col.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}