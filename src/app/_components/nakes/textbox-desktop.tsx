"use client"

import {useState} from 'react';

interface TextBoxDesktopProp {
    textBoxType: string;
}

export default function TextBoxDesktop({textBoxType} : TextBoxDesktopProp){

    const [text, setText] = useState("");

    return(
        <div className='p-5'>
            <input 
                type="text" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Masukkan ${textBoxType} disini ...`}
                className='py-3 w-[501px] px-6 rounded-[12px] bg-[#FFFCE1]'
            />
        </div>
    );
}