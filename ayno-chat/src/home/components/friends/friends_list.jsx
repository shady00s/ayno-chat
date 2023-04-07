import { ChevronDown } from "react-feather";
import { useEffect, useState, useContext, useCallback } from "react";
import EmptyContactComponent from "./empty_contacts_component";
import ApiCall from "../../../api_call";
import ContactButton from "./contact_button";
import { FriendListSkeleton } from "../../../reusable-components/skeleton/friend_list";
import CreateChatGroup from "../chat_group/create_chat_group";
import { useDispatch, useSelector } from "react-redux";
import { setNewFriend, setNotifications } from "../../../redux/slice";
export default function FriendsList() {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberofFriends, setNumberofFriends] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();

  const [firstTime, setFirstTime] = useState(true);
  const friend = useSelector((state) => state.data.friend);
  const notifications = useSelector((state) => state.data.notifications);

  const notificaitonDispatch = useDispatch();
  const friendDispatch = useDispatch();


  
  useEffect(() => {
    if (firstTime) {
      setLoading(true);
      ApiCall.getFriendsList().then((data) => {
        if (data.status === 200) {
          setFriends(() => data.data.body.friends);
          setLoading(false);
          setFirstTime(false);
          setNumberofFriends(data.data.body.friends.length)
        } else {
          setFriends(() => []);
          setLoading(false);
          setFirstTime(false);
        }
      });
    }
  }, []);
  
  
  useEffect(() => {
    let list = friends;
    let prevNotifications = [...notifications.friendsNotifications];
    //  add frinds from notifications
   
    
    if (friend.friendType === "add") {
        list.push(friend.data);
        setNumberofFriends(list.length);

    } else if (friend.friendType === "remove") {
      let newList = list.filter(
        (oldFriends) =>  {
           return oldFriends._id !== friend.data._id}
        );
        setFriends(()=>newList)
        setNumberofFriends(newList.length);

    }
    if (friend.data._id !== null) {
        friendDispatch(
            setNewFriend({
                data: {
            _id: null,
            name: "",
            profileImagePath: "",
            conversations: [],
        },
        type: "",
        friendType: "",
    })
    );
}
if (prevNotifications.length !== 0) {
    let newList = [...friends]
    for (let index = 0; index < prevNotifications.length; index++) {
        if (prevNotifications[index].friendType === "add") {
            newList.push(prevNotifications[index]);
        } else if(prevNotifications[index].friendType === "remove"){
          const removeIndex = newList.findIndex((data)=>data._id ===prevNotifications[index]._id)
           
          if(removeIndex !== -1){
            newList.splice(removeIndex,1)

          }
        }
       
      }
      setFriends(()=>newList)
      setNumberofFriends(newList.length);

  notificaitonDispatch(
    setNotifications({ ...notifications, friendsNotifications: [] })
  );
}
  //  setFriends(() => list);
  }, [friend,notifications]);


  return (
    <>
      <div className="pt-4 pd-4 ">
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className=" flex justify-between pl-3 pt-2 pb-2 pr-3 cursor-pointer hover:bg-[rgba(124,173,219,0.04)]"
        >
          <h1 className="text-slate-200 select-none">Friends</h1>
          <div className="flex justify-evenly w-[8rem]">
            <div>
              <span className="text-sm text-slate-400">
                {numberofFriends} friends
              </span>
            </div>

            <ChevronDown className="text-slate-200" />
          </div>
        </div>
        <div
          className={`${
            open ? "h-[30rem] p-1" : "h-[0rem] overflow-hidden"
          } relative overflow-y-auto  transition-all duration-300 ease-in-out`}
        >
          {loading ? (
            <FriendListSkeleton />
          ) : friends.length !== 0 ? (
            friends.map((data, index) => (
              <ContactButton
                isActive={false}
                onClick={() => {
                  setSelectedIndex(() => index);
                }}
                key={data._id}
                data={data}
                selected={selectedIndex === index ? true : false}
              />
            ))
          ) : (
            <div
              className="flex justify-center items-center w-full h-full
                    "
            >
              <EmptyContactComponent />
            </div>
          )}
          <div className=" absolute bottom-8 right-10">
            <CreateChatGroup />
          </div>
        </div>
      </div>
    </>
  );
}
