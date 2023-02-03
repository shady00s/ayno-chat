import React, { useState } from "react";
import LoadingComponent from './../../reusable-components/loading/loading_component';

const SubmitButton = (props) => {
    const [loading, setloading] = useState(false)
    return (
        <>
            <button className={"p-2 text-white rounded-md m-auto  bg-Indigo-700 relative " + props.className} onClick={() => {
                setloading(true)

                if (props.future){
                    setTimeout(()=>{
                        props.onClick().then(()=>{
                            setloading(false)
                        })
    
                    },200)
                }
               
                props.onClick()

            }
            }>{
            
            loading && props.future? <LoadingComponent/> : props.title
           }</button>
        </>
    )
}


export default SubmitButton;