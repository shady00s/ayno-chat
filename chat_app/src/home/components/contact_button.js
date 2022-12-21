export default function ContactButton(props){
    return(
        <div className="flex group items-center p-1 relative
           
           ml-2 mr-2 mb-2 cursor-pointer border-l-2 bg-subBackGround border-l-slate-800
           rounded-sm hover:bg-slate-800  hover:border-l-slate-700">
            <img alt="user profile"src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png" className="w-9"/>
            <div className="ml-6 flex flex-col justify-start">   
                <h3 className="font-sans text-slate-100 text-xl text-green-50">{props.data.name}</h3>

                <div className="flex   items-center"> 
                <h3 className="font-sans text-grey w-2/3 truncate">Tasdfasdfasdfsadfsdfasdfsdfsadfest</h3>
                <span className=" font-sans text-darkGreen text-xs mr-3">01:00pm </span>
                </div>
            </div>
            {/* message number component */}
            <div className="absolute right-8 top-2">
                
           
            <CounterComponent number="21"/>
            </div>
        </div>
    )
}


export function CounterComponent(props){

    return (
        <div className="bg-emerald-900 w-6 h-6 rounded-full flex justify-center p-1">
            <span className="text-xs text-center m-auto text-white">{props.number}</span>
        </div>
    )
}