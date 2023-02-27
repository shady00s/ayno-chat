import React from "react"

export default function IconButtonWithText(props) {
    // const IconTag = React.lazy(() => import(`react-feather/dist/icons/${props.icon}.js`))

    const activeIconStyle = props.isActive === true ? 'text-gray-100' : 'text-gray-400';

    
    return (


        <div id= {props.id} onClick={
            props.onClick} className=" flex p-1 rounded-md justify-center items-center cursor-pointer transition-all  hover:bg-slate-800 " >
            
                

                    <props.icon  id= {props.id} className={`${activeIconStyle}  w-5 h-5 m-1 flex justify-center items-center hover:text-gray-100`} />

      

            <h1  id= {props.id} className={` p-1 hover:text-gray-100 select-none  ${props.isHidden?"hidden":"visible"} ${activeIconStyle}`}>{props.name}</h1>

        </div>
    )
}