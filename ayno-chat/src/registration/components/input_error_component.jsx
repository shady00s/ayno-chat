const InputErrorComponent = (props)=>{
    return(
        <>
            <div className={`${props.show?"opacity-100 h-full mt-1 mb-2":"opacity-0 h-0 m-0 p-0"} overflow-hidden  transition-all duration-150 ease-in-out bg-slate-700 w-full  p-1 m-auto  rounded-md`}>
                <h3 className="text-red-300 pl-1">{props.title}</h3>
            </div>
        </>
    )
}

export default InputErrorComponent