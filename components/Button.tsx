import React from 'react'

type Props = {
    label:string,
    secondary?:boolean,
    fullWidth?:boolean,
    large?:boolean,
    click: () =>void
    disabled?:boolean,
    outline?:boolean,
}

const Button = (props: Props) => {
    const { label, secondary, fullWidth,large, click,disabled, outline} = props
    return (
        <button
            disabled={disabled}
            onClick={click}
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-white' : 'bg-sky-500'}
                ${secondary ? 'border-black' : 'border-sky-500'}
                ${secondary ? 'text-black' : 'text-white'}
                ${large ? 'text-xl' : 'text-md'}
                ${large ? 'px-5' : 'px-4'}
                ${large ? 'py-3' : 'py-2'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
            `}
        >
            {label}
        </button>
    )
}

export default Button