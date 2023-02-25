
export default function IconButton(props){
    const activeIconStyle = props.isActive === true ? 'text-gray-100' : 'text-gray-400';

    return(
        <div id= {props.id} onClick={(event)=>{
            props.onClick
            }}  className=" p-1 rounded-md cursor-pointer transition-all  hover:bg-slate-800 ">
            <props.icon id= {props.id} className={`${activeIconStyle} w-5`  }/>
        </div>
    )
}