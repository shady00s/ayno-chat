import React from "react"

export default function IconButtonWithText(props) {

    const activeIconStyle = props.isActive === true ? 'text-gray-100' : 'text-gray-400';

    
    return (

        <div id= {props.id} onClick={
            props.onClick} className={`${props.className} overflow-hidden flex rounded-md justify-center items-center cursor-pointer transition-all duration-100 hover:bg-slate-800 `} >
                      
                    <props.icon  id= {props.id} className={`${activeIconStyle} m-1 w-10 flex justify-center items-center hover:text-gray-100`} />
      
            <h1  id= {props.id} className={` p-1 hover:text-gray-100 select-none  ${props.isHidden?"hidden":"visible"} ${activeIconStyle}`}>{props.name}</h1>

        </div>
    )
}