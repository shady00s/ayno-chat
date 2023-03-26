import { useContext,useState } from "react";
import { UserMinus, X } from "react-feather";
import NavigationContext from "../../context/navigationContext";
import ContactContext from "../../context/contactContext";
import InputTextComponent from "../../registration/components/input_text_component";
import InputErrorComponent from "../../registration/components/input_error_component";
import ApiCall from "../../api_call";
import FriendContext from './../../context/friendContext';

export default function RemoveFriendAlert() {
  const { navigation, setNavigation } = useContext(NavigationContext);
  const { contact } = useContext(ContactContext);
  const [text,setText] = useState("")
  const [disabled,setDisables] = useState(false)
  const {setFriend} = useContext(FriendContext)
  return (
    <div
      id="bg-friendAlert"
      onClick={(e) => {
        if (e.target.id === "bg-friendAlert") {
          console.log("sfd");
          setNavigation("");
        }
      }}
      className={`${
        navigation === "remove-friend_alert"
          ? "opacity-100 translate-x-0"
          : " opacity-0 translate-x-[9999px]"
      }  transition-opacity duration-100 ease-in-out absolute w-full h-full flex justify-center items-center bg-theme`}
    >
      <div className="bg-background md:w-[40%] w-4/5  p-1 rounded-lg">
        {/* title and close button */}
        <div className="flex justify-between items-center">
          <h1 className="text-slate-200 p-2">
            Remove {contact.name} from friends
          </h1>
          <div
            onClick={() => {
              setNavigation("");
            }}
            className="flex select-none cursor-pointer p-2 rounded-md transition-all duration-75 ease-in  hover:bg-[rgba(116,121,219,0.2)]"
          >
            <X className="stroke-slate-500" />
            <span className="text-slate-500">close</span>
          </div>
        </div>

        {/* question */}
        <h1 className="text-slate-500 p-1 text-sm ">to remove {contact.name} from your friends list you need to write <span className="m-1 text-lg font-bold text-slate-200">{contact.name}</span> in order to remove friend.</h1>
            <InputTextComponent onChange={(event)=>{
                setText(event.target.value)
                if(event.target.value === contact.name){
                    setDisables(false)
                }else{
                    setDisables(true)
                }
            }} placeHolder="Write the name here."/>
            <div className="flex">
                <button onClick={()=>{
                    if ( text!==contact.name) {
                        setDisables(true)

                    }else{
                        ApiCall.deleteFriend(contact._id).then(val=>{
                          setFriend(()=>({data:contact,type:"remove"}))

                        }).catch(err=>{
                          console.log(err)
                          alert("There is an error, please try again")
                        })
                    }
                }} className="border-[1px] p-1 border-gray-700 rounded-lg m-1 flex items-center text-sm text-slate-400" ><UserMinus size={18} className="stroke-blue-600 mr-1 "/> confirm</button>
                <button className="border-[1px] p-1 border-gray-700 rounded-lg m-1 flex items-center text-sm text-slate-400"><X size={18}  className="stroke-pink-600 mr-1"/> cancel</button>
            </div>
            
            <InputErrorComponent show={disabled} title="please type friend name correctly"/>

            
      </div>
    </div>
  );
}
