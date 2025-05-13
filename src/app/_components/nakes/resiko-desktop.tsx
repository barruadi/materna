"use client"

import {useState, useEffect, useRef} from 'react';

interface ResikoPasien {
    idResikoPasien : any;
}

export default function ResikoDesktop({idResikoPasien} : ResikoPasien) {

    const [isOpen, setIsOpen] = useState<boolean>(false); //set default open dropdown to false
    const [selected, setSelected] = useState<{name: string, color: string}>({
        name: "Pilih Resiko",
        color: "#CBD5E1"
    });
    const opsiResiko = [
        {idResiko: 1, name: "Resiko Tinggi", color: "#FA646A"},
        {idResiko: 2, name: "Resiko Sedang", color: "#FAB900"},
        {idResiko: 3, name: "Resiko Rendah", color: "#78C142"}
    ];
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        // event listner
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() =>{
        if (idResikoPasien !== null && idResikoPasien !== undefined) {
            const foundResiko = opsiResiko.find((opsi) => opsi.idResiko === idResikoPasien);
            if (foundResiko) setSelected({name: foundResiko.name, color: foundResiko.color});
        } else if (idResikoPasien === null){
            setSelected({name: "Pilih Resiko", color: "#CBD5E1"});
        }
    }, [idResikoPasien]);

    return(
        <div className='relative inline-block text-left w-44' ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='text-white px-4 py-2 rounded-xl flex justify-between gap-2 w-full'
                style={{ backgroundColor: selected.color }}>
                {selected.name} <img src='/drop-down.svg' className='pl-1 w-6 h-6'></img>
            </button>

            {isOpen && (
            <div className="absolute z-50 mt-1 w-44 h-32 bg-white border rounded-xl shadow-md overflow-y-auto">
                {opsiResiko.map((opsi) => (
                    <button
                        key={opsi.idResiko}
                        className="w-full h-10 text-left px-3 py-2 text-sm text-gray-700 bg-white hover:rounded-xl hover:text-white"
                        style={{ "--hover-color": opsi.color } as React.CSSProperties}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = opsi.color)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        onClick={() => {
                            setSelected({ name: opsi.name, color: opsi.color });
                            setIsOpen(false);
                        }}
                    >
                        {opsi.name}
                    </button>
                ))}
            </div>
)}

        </div>
    )
}