import { UserPlus } from "react-feather"

const NewFirendComponent = (props)=>{
    return(<>
    <div className="flex items-center bg-subBackGround p-1 m-1 mb-3 rounded-md">
        <img className="w-12 rounded-full" alt="profile" src={props.data.profilePath}/>
        <div className="ml-2 ">
            <h2 className="text-slate-200">{props.data.name}</h2>
            <p className="text-slate-500 ml-2 m-2">This user is not your friend.</p>
            <div className="flex justify-evenly pt-2 pb-2">

                <button className="p-1 pl-2 pr-2 mr-1 text-slate-300 bg-sky-600 rounded-md flex justify-center items-center "><UserPlus className="mr-1" size={17}/> Add Friend</button>
                <button className="p-1 pl-2 pr-2 text-slate-300 bg-cyan-800 rounded-md flex justify-center items-center "><UserPlus className="mr-1" size={17}/>Send Message</button>
            </div>
        </div>
    </div>

    </>)
}

export default NewFirendComponent