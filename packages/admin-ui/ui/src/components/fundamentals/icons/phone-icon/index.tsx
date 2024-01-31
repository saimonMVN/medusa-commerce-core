import React from "react"
import IconProps from "../types/icon-type"

const  PhoneIcon:React.FC<IconProps> = ({
                                            size = "20",
                                            color = "currentColor",
                                            ...attributes
                                        })=> {

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attributes}
        >
            <path
                d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z"
                fill="#000"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default PhoneIcon
