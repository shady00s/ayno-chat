const InputErrorComponent = (props)=>{
    return(
        <>
            <div className="mt-1 mb-2  bg-slate-700 w-full  p-1 m-auto  rounded-md">
                <h3 className="text-red-300 pl-1">{props.title}</h3>
            </div>
        </>
    )
}

export default InputErrorComponent