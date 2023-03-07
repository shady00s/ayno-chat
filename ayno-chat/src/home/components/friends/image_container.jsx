import { createElement, useState } from "react"
import { Save,Menu } from "react-feather"
export default function ImageContainer(props){
    const [open,setOpen] = useState(false)

    function saveImageToDevice(event){
        const image = new Blob([
            props.image
        ],{type:"image/*"})
        const element = document.createElement('a')
        element.href = props.image
        element.download = `ayno${Math.round(Math.random()*10)}.png`
        element.target ="_blank"
        element.click()
        URL.createObjectURL(image)
    }
    return(<div className="relative w-30 h-30 flex justify-end ">
        <div className="absolute flex flex-row-reverse p-2 ">
            <Menu onClick={()=>{setOpen(!open)}} className="stroke-slate-300 shadow-lg cursor-pointer "/>
            <div className={`${open?"w-auto h-[10%] opacity-100 p-2":"w-0 h-0 p-0 opacity-0"} transition-opacity overflow-hidden bg-background rounded-lg  flex `}>
                <button onClick={(event)=>{
                    saveImageToDevice(event)
                }} className="flex p-1 items-center justify-center rounded-md m-auto transition-colors hover:bg-[rgba(121,144,231,0.3)]"><Save size={20} className="m-1 stroke-slate-500"/><span className="text-sm text-slate-400">Save photo</span></button>
            </div>

        </div>
        <img onClick={(target)=>{
            setOpen(!open)
        }} className="w-full object-contain rounded-md p-1 " src={props.image}/>
    </div>)
}