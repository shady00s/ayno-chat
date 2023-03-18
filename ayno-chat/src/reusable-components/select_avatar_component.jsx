import * as cartoonAvatar from 'cartoon-avatar'

import { useState, useEffect } from 'react'
import LoadingComponent from './loading/loading_component'

const SelectAvatarComponent = (props) => {
    
    const [avatar, setAvatar] = useState([])
    const [selectAvatar, setSelectAvatar] = useState({ name: avatar[0], index: -1 })
    const [gender,setGender] = useState("male")

    // get avatars from cartoon avatar api
    function avatarGenerator(gneder, avatar) {
        // to not render more images every refresh
        if (avatar.length <= 40) {
            setAvatar([])
            for (let x = 0; x < 40; x++) {
                setAvatar((avatarItem) => [...avatarItem, cartoonAvatar.generate_avatar({ "gender": gneder, "id": x + 1 })])

            }
        }

        return

    }
    useEffect(() => {

      
        avatarGenerator(gender, avatar)




    }, [selectAvatar,gender])
    return (
        <>
        
        <div className='flex flex-col w-full'>  
        <div className="flex justify-between items-end flex-wrap w-10/12">
                        <h2 className="text-slate-200 text-md mb-2 mt-5">Select your avatar</h2>

                           <div className="h-full flex justify-evenly  items-center m-2 mt-4" >
                            <button onClick={()=>{
                                setGender(()=>"male")}} className={`${gender==="male"? "bg-blue-800 ":"bg-zinc-600 "} transition-colors w-16 h-10 m-1 rounded-md text-slate-200` }>Male</button>
                          {props.changeGender?  <button onClick={()=>{
                                setGender(()=>"female")}} className={`${gender==="female"? "bg-pink-700 ":"bg-zinc-600 "} transition-colors w-16 h-10 bg-zinc-600 m-1 rounded-md text-slate-200 `}>Female</button>:null}
                            </div> 
                        </div>
            <div  className='flex flex-wrap h-46 overflow-y-auto p-1'>


                {avatar.length === 0 ? <LoadingComponent title={"Loading Avatars...."} /> : avatar.map((img, index) =>
                    <img alt="avatars" loading='lazy' onClick={(target) => {
                        props.onClick(target)
                        setSelectAvatar({ name: target.target.getAttribute('src'), index: index })
                    }} key={img + index} className={`w-12 p-1 ${selectAvatar.index === index ? "rounded-md border-2 border-teal-400 transition-all" : "border-transparent transition-all"}`} src={img} />


                )}
            </div>
           
            </div>  
        </>
    )
}

export default SelectAvatarComponent