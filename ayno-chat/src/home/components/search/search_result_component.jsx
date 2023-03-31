import React, { useEffect, useState } from "react";
import { UserPlus, MessageSquare, Settings } from "react-feather";
import { useContext } from "react";
import NavigationContext from "../../../context/navigationContext";
import ApiCall from "../../../api_call";
import LoadingComponent from "../../../reusable-components/loading/loading_component";
import SocketContext from "./../../../context/socketContext";
import { useSelector, useDispatch } from "react-redux";
import { setNewContact } from "../../../redux/slice";



const SearchResultComponent = (props) => {
  const user = useSelector((state) => state.data.user);
  const { setNavigation } = useContext(NavigationContext);
  const setContact = useDispatch();
  const socket = useContext(SocketContext);
  console.log(props);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");


  async function sendRequest(data) {
    setLoading(true);
    socket.emit("new-notification", {
      name: user.name,
      _id: props.data.id,
      id:user.id,
      profileImagePath: user.profileImagePath,
      type: "friend-request",
    });
    await ApiCall.postFriendRequest({
      friend_id: data,
    })
      .then((val) => {
        if (val.status !== 200) {
          alert("There is an error");
          setLoading(false);
        } else {
          alert("Request has been sent");
          setLoading(false);
          setText("Friend Request has been sent");
        }
      })
      .catch((err) => {
        alert("error occured");
        setLoading(false);
      });
  }

  useEffect(() => {
    props.data.isInFriendRequests
      ? setText("Friend Request has been sent")
      : props.data.isFriend
      ? setText("In your friends")
      : user.id === props.data.id
      ? setText("My Profile")
      : setText("This user is not your friend.");
  }, []);
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
            <p className="text-slate-500 ml-2 m-2">{text}</p>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="pt-2 pb-2 flex justify-center w-full">
              {props.data.isFriend && user.id !== props.data.id ? (
                <button
                  onClick={() => {
                    setContact(
                      setNewContact({
                        _id: props.data.id,
                        conversations: [
                          {
                            conversation_Id:
                              props.data.conversation_id[0].conversation_Id,
                          },
                        ],
                        profileImagePath: props.data.profileImagePath,
                        name: props.data.name,
                        type: "contact",
                      })
                    );
                  }}
                  className=" p-1 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"
                >
                  <MessageSquare className="mr-1 stroke-pink-600" size={17} />
                  Send Message
                </button>
              ) : props.data.isInFriendRequests ? null : user.id ===
                props.data.id ? (
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
                   
                    sendRequest(props.data.id);
                  }}
                  className={`${
                    text === "Friend Request has been sent" ? "hidden" : "flex"
                  } m-auto p-1 rounded-md text-slate-300 border-2 border-slate-800 justify-center items-center text-sm`}
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
