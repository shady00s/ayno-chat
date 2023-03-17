import React,{ useContext, useState,useEffect } from "react"
import NavigationContext from './../../context/navigationContext';
import LoadingComponent from './../../reusable-components/loading/loading_component';
import { Menu,Save } from "react-feather";
import saveImageToDevice from "../../utils/save_image_to_device";
export default function ViewImageComponent() {
    const [open, setOpen] = useState(false)
    const { navigation, setNavigation } = useContext(NavigationContext)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        const img = new Image()
        img.onload = () => setLoading(true);
        img.src = navigation.link;
    },[navigation])
    return (
        <div id="bgImage" onClick={(e) => {
            if (e.target.id === "bgImage") {
                setNavigation("")
            }
        }} className={`${navigation.navigate === "showImage" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[9999px]"} flex justify-center items-center transition-opacity duration-100 ease-in w-full h-full bg-theme absolute`}>
            <div className={'md:w-[50%] h-[60%] flex justify-center items-center rounded-lg w-4/5 bg-background p-1'}>
                {loading ? <div className="w-[80%] h-[90%] flex justify-end relative">
                    <div className="absolute  flex flex-row-reverse p-2 ">
                        <Menu onClick={() => { setOpen(!open) }} className="stroke-slate-300 shadow-lg cursor-pointer " />
                        <div className={`${open ? "w-auto h-[10%] opacity-100 p-2" : "w-0 h-0 p-0 opacity-0"} transition-opacity overflow-hidden bg-background rounded-lg  flex `}>
                            <button onClick={(event) => {
                                saveImageToDevice(event, props.image)
                            }} className="flex p-1 items-center justify-center rounded-md m-auto transition-colors hover:bg-[rgba(121,144,231,0.3)]"><Save size={20} className="m-1 stroke-slate-500" /><span className="text-sm text-slate-400">Save photo</span></button>
                        </div>

                    </div>

                    <img  className=" object-contain w-full h-full"   src={navigation.link} /></div> : <div><LoadingComponent /></div>
                }

            </div>
        </div>
    )
}