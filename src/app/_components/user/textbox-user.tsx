interface TextboxUserProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextboxUser({placeholder, value, onChange}: TextboxUserProps) {
    return (
        <div className="w-full px-6">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="py-3 w-full px-6 rounded-[12px] bg-[#FFFCE1]"
                placeholder={placeholder}
            />
        </div>
    )
}

export default TextboxUser;