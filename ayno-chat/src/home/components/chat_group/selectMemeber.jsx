import { useState } from "react"
export default function Selectmember(props) {
    const [selected,setSelected]= useState(false)
    return (
        <div>
            <div onClick={() => { 
                setSelected(!selected)
                props.onClick(props.data)
                }} className={`${selected?"bg-slate-700":"bg-subBackGround"} p-2 flex group items-center justify-evenly  w-full transition-colors  mb-2 cursor-pointer border-l-2  border-l-slate-800rounded-sm hover:bg-slate-800  hover:border-l-slate-700`}>

                <img alt="user profile" src={props.data.profileImagePath} className="w-7 rounded-full " />
                <div className="ml-3 pr-1 w-8/12 flex flex-col justify-start ">
                    <h3 className="font-sans text-slate-100 text-md   truncate ">{props.data.name}</h3>


                </div>
            </div>
        </div>
    )
}