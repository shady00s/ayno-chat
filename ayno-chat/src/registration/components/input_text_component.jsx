const InputTextComponent =(props)=>{
    return(
        <>
             <input onChange={props.onChange} value={props.value} className=" focus:outline-0 text-slate-300 mb-4 m-1 p-2 bg-transparent border-b-2 border-b-cyan-700" type={"text"} placeholder={props.placeHolder}></input>

        </>
    )
}

export default InputTextComponent