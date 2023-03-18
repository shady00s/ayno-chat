import React, { useState } from "react";
import { UserPlus, MessageSquare, Settings } from "react-feather";
import { useContext } from "react";
import ContactContext from "../../../context/contactContext";
import NavigationContext from "../../../context/navigationContext";
import ApiCall from "../../../api_call";
import LoadingComponent from "../../../reusable-components/loading/loading_component";
import UserContext from "../../../context/userContext";
import SocketContext from './../../../context/socketContext';
async function sendRequest(data) {
  return await ApiCall.postFriendRequest({
    friend_id: data,
  }).then((val) => val);
}

const SearchResultComponent = (props) => {
  const { user } = useContext(UserContext);
  const { setNavigation } = useContext(NavigationContext);
  const { setContact } = useContext(ContactContext);
  const socket = useContext(SocketContext)
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex items-center bg-subBackGround p-1 m-1 mb-3 rounded-md">
        <div className=" w-full">
          <h2 className="text-slate-200 ml-2">{props.data.name}</h2>
          <div className="flex items-center m-2">
            <img
              className="ml-2 w-8 rounded-full"
              alt="profile"
              src={props.data.profileImagePath}
            />
            <p className="text-slate-500 ml-2 m-2">
              {props.data.isFriend
                ? "In your friends"
                : user.id === props.data.id
                ? "My Profile"
                : "This user is not your friend."}
            </p>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="pt-2 pb-2 flex justify-center w-full">
              {props.data.isFriend && user.id !== props.data.id ? (
                <button
                  onClick={() => {
                    setContact({
                      _id: props.data.id,
                      conversations: [
                        { conversation_Id: props.data.conversation_id },
                      ],
                      profileImagePath: props.data.profileImagePath,
                      name: props.data.name,
                      type: "contact",
                    });
                  }}
                  className=" p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"
                >
                  <MessageSquare className="mr-1 stroke-pink-600" size={17} />
                  Send Message
                </button>
              ) : user.id === props.data.id ? (
                <button
                  onClick={() => {
                    setNavigation("Settings");
                  }}
                  className="p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"
                >
                  <Settings className="mr-1 stroke-purple-600" />
                  Go to settings
                </button>
              ) : (
                <button
                  onClick={() => {
                    setLoading(true);
                    socket.emit("new-notification",{ name:props.data.name, id:props.data.id, profileImagePath:props.data.profileImagePath, type:"friend-request"})

                   sendRequest(props.data.id).then((val) => {
                      if (val.status !== 200) {
                        alert("There is an error");
                        setLoading(false);
                      } else {
                        alert("Request has been sent");
                        setLoading(false);
                      }
                    });
                  }}
                  className="m-auto p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"
                >
                  <UserPlus className="mr-1 stroke-sky-600" size={17} /> Add
                  Friend
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultComponent;