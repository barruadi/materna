"use client"

import { useEffect, useState } from 'react';

interface UserProps {
    name: string;
    nip: string;
    image: string;
}

export default function NavbarDesktop({name, nip, image}: UserProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div className={`fixed top-0 left-0 h-full bg-white text-black py-5
            flex flex-col rounded-l-none
            transform ${isOpen ? 'w-72 rounded-[35px]' : 'w-[90px] rounded-3xl'}
            transition-all duration-300 ease-in-out`}>
            <div className='flex pl-[15] items-center mt-5'>
                {/*Toggle Button*/} 
                <button
                    className='size-12 rounded-md place-items-center'
                    onClick={() => setIsOpen(!isOpen)}>
                    <img src="/toggle-icon.svg" alt="toggle-icon" />
                </button>

                {/*Title Puskesmas*/}
                <b className={`text-lg text-black ml-6 whitespace-nowrap transform transition-all ease-in-out
                    ${isOpen ? 'opacity-100 max-w-full delay-200 duration-300' : "opacity-0 max-w-0 duration-[50ms]"}`}>
                    Puskesmas ITB
                </b>
            </div>

            {/*User Info*/}
            <div className={`mt-6 place-items-center whitespace-nowrap
                transform transition-all ease-in-out
                ${isOpen ? 'opacity-100 max-w-full delay-200 duration-300' : 'opacity-0 duration-[50ms]'}`}>
                <ul className={`flex flex-col justify-center items-center space-y-2`}>
                    <li>
                        <img src={image} alt="profile" className='rounded-full' />
                    </li>
                    <li className="text-center pt-2">{name}</li>
                    <li className="text-center">{nip}</li>
                </ul>
            </div>

            {/*Navigation*/}
            <div className= {`mt-24 whitespace-nowrap 
                transform transition-all ease-in-out
                ${isOpen ? 'opacity-100 max-w-full delay-200 duration-300 pl-12' : 'place-items-center'}`}>                    
                    <nav>
                        <ul className='flex flex-col space-y-10 text-lg font-semibold'>
                            <li> <a href="/homepage"> {isOpen ? 'Beranda' : <img src='/homepage-icon.svg' alt="homepage-icon"/>} </a> </li>
                            <li> <a href="/patientlist"> {isOpen ? 'Daftar Pasien' : <img src='/patient-icon.svg' alt="patient-icon" className='ml-[1px]'/>} </a> </li>
                            <li> <a href="/schedule"> {isOpen ? 'Jadwal' : <img src='/schedule-icon.svg' alt="schedule-icon"/>} </a>  </li>
                        </ul>
                    </nav>
            </div>
        </div>
    )
}