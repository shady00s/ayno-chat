import React from "react"

export default function IconButtonWithText(props) {
    // const IconTag = React.lazy(() => import(`react-feather/dist/icons/${props.icon}.js`))

    const activeIconStyle = props.isActive === true ? 'text-gray-100' : 'text-gray-400';

    
    return (


        <div id= {props.id} onClick={(event)=>{props.onClick(event)}} className=" flex p-1 rounded-md justify-center items-center cursor-pointer transition-all  hover:bg-slate-800 " >
            <div  id= {props.id} className="w-5 h-5 m-1 flex justify-center items-center">
                

                    <props.icon  id= {props.id} className={`${activeIconStyle}  hover:text-gray-100`} />

            </div>

            {props.name === ""?<h1  id= {props.id} className={` xl:block p-1 hover:text-gray-100 hidden ${activeIconStyle}`}>{props.name}</h1>:null}

        </div>
    )
}