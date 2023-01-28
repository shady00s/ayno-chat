import { UserPlus, X } from "react-feather"

const FriendRequestComponent = () => {
    return (<>
            <div className="p-2">
                <h6 className="text-slate-200 text-left p-1">{"Friend Requests"}</h6>

            </div>
        <div className="bg-subBackGround m-2 rounded-md">
            <div className="flex justify-center items-center">
                <img src={"./images/no-contact.png"} className="w-8 h-8" />
                <div className=" p-2">
                    <h1 className="text-slate-200">Test</h1>
                    <span className="text-slate-400 text-sm">wants you to be your friend</span>
                </div>

            </div>
            <div className="flex justify-evenly p-2">
                <button className=" p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm pr-2 pl-2"><UserPlus className="mr-1 stroke-green-600" size={17} />Accept</button>
                <button className=" p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm pr-2 pl-2"><X className="mr-1 stroke-pink-600" size={17} />Ignore</button>

            </div>
        </div>

    </>)
}

export default FriendRequestComponent