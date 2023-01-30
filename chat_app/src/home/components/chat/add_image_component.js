import React, { useState, useEffect } from 'react';
import convertBase64 from '../../../utils/base64';
import IconButtonWithText from '../icon_button_with_text';
import IconButton from './../icons_button';
import { Paperclip, Image, File, Folder } from 'react-feather';
import ApiCall from './../../../api_call';
import StorageManager from '../../../utils/storage_manager';
import SocketClientManager from './../../../sockets/message_socket';
const socketRef = SocketClientManager.socketInit()


//convert selected images to base64 and return them into array and send them to the server
async function imageConverter(imagesList) {


    const userId = StorageManager.getDataFromStorage()
    const convertedImageList = [];
    for (let index = 0; index < imagesList.length; index++) {
        convertedImageList.push(await convertBase64(imagesList[index]))
    }

    return await ApiCall.postMediaToServer({ media: convertedImageList, sender_id: userId.id, conversation_id: "63ab380966640e1bdf353f36", sender_image_path: userId.profilePath }).then(vals => vals)
}

const AddImageComponent = () => {


    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="relative p-2">
                <IconButton icon={Paperclip} onClick={() => { setOpen(!open) }} />
                {/* selection container */}
                <div className={`${open ? "translate-x-0" : "translate-x-[999px]"} transition-transform duration-300 absolute p-2 bg-[#1d2429] z-50 -top-[5.1rem] rounded-md -left-28 w-64 h-30 `}>
                    <div className='flex'>
                        <Folder className=' mr-2 stroke-slate-400' />
                        <h1 className='text-slate-200 select-none'>Send Media</h1>

                    </div>
                    <IconButtonWithText isHidden={false} icon={Image} name={"Send image"} onClick={(event) => { document.querySelector('.imageFileInput').click() }} />
                    <input multiple type={"file"} accept='image/*' className='hidden imageFileInput ' onChange={async (event) => await imageConverter(event.target.files)} />
                </div>
            </div>
        </>
    )
}

export default AddImageComponent