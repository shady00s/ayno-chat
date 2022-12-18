 const SubmitButton = (props)=>{
    return(
        <>
            <button className={"p-2 text-white rounded-md m-auto  bg-teal-600 relative " +props.className  } onClick={props.onClick}>{props.title}</button>
        </>
    )
}


export default SubmitButton;