

import {logo} from '../../../constants'
export default function GroupChatButtonComponent(props){
    return(<>
    <div className="ml-1 bg-[rgba(123,167,243,0.06)] rounded-lg flex-col w-[96%] flex  justify-center">
        <div className='flex items-center w-[95%] pl-1'>
            <h1 className='pl-2 text-ellipsis text-slate-200 select-none'>{props.data.conversation_name}</h1>
        </div>
        <h6 className='p-1 pl-3 text-slate-400 text-sm select-none'>members</h6>
        <div className='flex overflow-y-scroll select-none'>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>
        <img src={logo} className='w-10 m-2 h-10 rounded-full object-contain'/>

        </div>
    </div>
    </>)
}