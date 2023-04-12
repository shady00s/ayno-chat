import { createElement, useState } from "react"
import { Save,Menu } from "react-feather"
import saveImageToDevice from "../../../utils/save_image_to_device.js"
export default function ImageContainer(props){
    const [open,setOpen] = useState(false)
    const [load,setLoad]=useState(false)
    function onLoad(){
        setLoad(true)
    }
    return(<div className="relative w-30 h-30 flex justify-end ">
        <div className="absolute flex flex-row-reverse p-2 ">
            <Menu onClick={()=>{setOpen(!open)}} className="stroke-slate-300 shadow-lg cursor-pointer "/>
            <div className={`${open?"w-auto h-[10%] opacity-100 p-2":"w-0 h-0 p-0 opacity-0"} transition-opacity overflow-hidden bg-background rounded-lg  flex `}>
                <button onClick={(event)=>{
                    saveImageToDevice(event,props.image)
                }} className="flex p-1 items-center justify-center rounded-md m-auto transition-colors hover:bg-[rgba(121,144,231,0.3)]"><Save size={20} className="m-1 stroke-slate-500"/><span className="text-sm text-slate-400">Save photo</span></button>
            </div>

        </div>
        <img onLoad={onLoad} onClick={(target)=>{
            setOpen(!open)
        }} className={`w-full object-contain rounded-md p-1 ${load? "block":"none"}`} src={props.image}/>
        {!load &&<div className={`w-7/12 h-4/6 `}></div>}
    </div>)
}