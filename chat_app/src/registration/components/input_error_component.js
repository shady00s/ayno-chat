const InputErrorComponent = (props)=>{
    return(
        <>
            <div className="mt-1 bg-slate-700 w-full h-10 p-3 m-auto text-center flex justify-center items-center rounded-md">
                <h3 className="text-red-300">{props.title}</h3>
            </div>
        </>
    )
}

export default InputErrorComponent