import React from "react"
export default function IconButtonWithText(props){

    const IconTag = React.lazy(()=>import(`react-feather/dist/icons/${props.icon}.js`) )

    const activeIconStyle = props.isActive === true? 'text-gray-100': 'text-gray-400';


    return(


        <div className="flex p-2 items-center cursor-pointer hover:bg-slate-800" >

                <React.Suspense>

                <IconTag className= {activeIconStyle}/>
                
                <h1  className={`pl-3 pr-1 ${activeIconStyle}`}>{props.name}</h1>
                </React.Suspense>
        </div>
    )
}