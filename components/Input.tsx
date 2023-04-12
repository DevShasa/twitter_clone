import React from 'react'

type Props = {
    placeHolder?:string;
    value?:string;
    type?:string;
    disabled?:boolean
    change:(event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => {
    const {placeHolder, value, type, disabled, change} = props
    return (
        <input 
            disabled={disabled}
            onChange={change}
            value={value}
            placeholder={placeHolder}
            type={type}
            className="
                w-full
                p-4
                text-lg
                bg-black
                border-2
                border-neutral-800
                rounded-md
                outline-none
                text-white
                focus:border-2
                focus:border-sky-500
                transition
                disabled:bg-neutral-500
                disabled:opacity-70
                disabled:cursor-not-allowed
            "
        />
    )
}

export default Input