import { CheckCircle } from "react-feather";

export default function ChatMessageComponent(props){

    const guestMainContainerStyle = ' bg-sky-900 flex justify-center items-center  min-h-min rounded-lg pl-2 pr-2 mr-2';
    const guestMainTitleContainerStyle = 'w-6 pr-2 mr-2 '

    const ownerMainContainerStyle = 'bg-cyan-900 flex justify-center items-center  min-h-min rounded-lg pl-2 pr-2 ml-2';
    const ownerTitleContainerStyle = 'w-6 pl-2 ml-2';

    const mainContainerDirection = 'flex-row-reverse'
    return (
        <div  className={` border-gray-800  flex flex-col justify-between items-center`}>

                <div   className={ `  flex   ${props.isUser !== true ? mainContainerDirection:null } p-1  justify-start w-11/12`}>
                    {/* chat text container */}
                    <div  className={ `${props.isUser === true ? ownerMainContainerStyle : guestMainContainerStyle}  relative pr-6`}>

                    {/* user container image and name container */}


                    <span className=" text-white leading-relaxed text-center">
                   hello sdfsfs
                    </span>
                    <CheckCircle className="w-2 absolute right-2 bottom-1"  color={"#ffffff"}/>            
                    </div>
                    <div className= {` ${props.isUser === true ? ownerTitleContainerStyle : guestMainTitleContainerStyle}`}>
                    <img alt="user profile" src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png" className="w-full"/>

                    </div>

                </div>

                <div style={{backgroundColor:"rgba(70,70,70,0.1)" , height:"2px",}} className= "m-3 w-full ml-2"></div>

        </div>
        
    )
}