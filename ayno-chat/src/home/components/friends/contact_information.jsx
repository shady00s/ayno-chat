import React, { useState, useEffect, useContext } from "react";
import useWindowDimensions from "../../../utils/window_size";
import ApiCall from "../../../api_call";
import { Image } from "react-feather";
import { ContactSkeleton } from "../../../reusable-components/skeleton/contact_info";
import ContactContext from "./../../../context/contactContext";
import SocketContext from "./../../../context/socketContext";
import { MessageSquare } from "react-feather";
import NavigationContext from "../../../context/navigationContext";

function ContactInformation(props) {
  const socket = useContext(SocketContext);
  const { width } = useWindowDimensions();
  const [media, setMedia] = useState([]);
  const { contact, setContact } = useContext(ContactContext);
  const [loading, setLoading] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState();
  const [data, setData] = useState({ name: "", id: "" });
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedGroupMember, setSelectedGroupMember] = useState(-1);
  const [selectedGroupMemberData, setSelectedGroupMemberData] = useState({});
  const {navigation,setNavigation} = useContext(NavigationContext)
  
  useEffect(() => {
    socket.on("online-users", (users) => {
      users.find((soketId) => soketId.id === data.id) !== undefined
        ? setIsUserOnline(true)
        : setIsUserOnline(false);
    });
    socket.on("images", (images) => {
      setMedia((prev) => [...prev, images.message]);
    });
    return () => {
      socket.off("online-users");
      socket.off("images");
    };
  }, [data, socket]);
  useEffect(() => {
    if (Object.keys(contact).length !== 0) {
      if (contact.type === "contact") {
        setLoading(true);

        ApiCall.getMediaData(contact.conversations[0].conversation_Id).then(
          (val) => {
            setMedia(() => val.data.body);
            setData(contact);
            setLoading(false);
          }
        );
      } else {
        setLoading(true);
        ApiCall.getGroupsInfo(contact.conversation_id).then((groupVal) => {
          setData({
            name: groupVal.data.body.conversation_name,
            _id: groupVal.data.body.conversation_id,
          });
          setMedia(groupVal.data.body.media);
        });
        ApiCall.getGroupContacts(contact.conversation_id).then((val) => {
          setGroupMembers(val.data.body);
          setLoading(false);
        });
      }
    }
  }, [contact]); //contact


  return (
    <>
      {width <= 770 ? (
        // mobile version
        <div id="bg-contact"
          onClick={()=>{
            setNavigation("")
          }}
          className={`${
            navigation ==="contact-information" ? "opacity-1  visible" : "opacity-0   translate-x-[999px]"
          } overflow-x-hidden     transition-opacity absolute flex justify-end  right-0 bg-theme w-full h-full ease-in-out duration-100`}
        >
          {/* main container */}
          <div
            className={`${
              navigation ==="contact-information" ? "translate-x-0" : "translate-x-[999px] "
            } sm:w-5/12 bg-background  w-5/6  flex flex-col justify-start transition-transform ease-in-out duration-500`}
          >
            <div className="  flex flex-col justify-center items-center w-full">
              <div className="relative w-20">
                <img
                  className=" rounded-full w-20 mt-10"
                  src={contact.profileImagePath}
                />

                <div
                  className={`${
                    isUserOnline ? "scale-100" : "scale-0"
                  } transition-transform duration-100 ease-out w-4 h-4 bg-emerald-500 absolute bottom-0 rounded-full right-2 border-gray-800 border-2`}
                >
                  {isUserOnline}
                </div>
              </div>
            </div>

            <h1 className="mt-8 text-slate-200 text-xl mb-4  ml-auto mr-auto ">
              {data.name}
            </h1>

            {/* ID container */}

            <div className="flex mt-4 w-4/5 ml-auto mr-auto justify-evenly">
              <h3 className="text-slate-300">ID</h3>
              <span className="text-slate-400">{data._id}</span>
            </div>

            <div className="bg-slate-900 mt-10 mr-auto ml-auto w-10/12 h-[0.1rem]"></div>

            {/* group contacts container */}
            <div className="overflow-y-auto h-[67rem]">
              {groupMembers.length !== 0 && contact.type === "group" ? (
                <div
                  onMouseLeave={() => {
                    setSelectedGroupMember(-1);
                    setSelectedGroupMemberData({});
                  }}
                  className=""
                >
                  <h2 className="text-slate-200 text-md ml-12 mt-6 mb-4">
                    Conversation members
                  </h2>
                  <div className="flex justify-evenly w-[70%] overflow-x-auto overflow-y-hidden">
                    {groupMembers.map((data, index) => (
                      <div key={data.name} className="p-1 w-14 m-1">
                        <img
                          onMouseEnter={() => {
                            setSelectedGroupMemberData(data);
                            setSelectedGroupMember(index);
                          }}
                          className="cursor-pointer rounded-md hover:scale-150 transition-transform duration-100 object-contain"
                          src={data.profileImagePath}
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${
                      selectedGroupMember === -1 ? "h-0 opacity-0" : "h-[99%]"
                    } transition-all duration-300 ease-out overflow-hidden`}
                  >
                    <h2 className={`text-slate-200 text-sm ml-12 mt-6 mb-4 `}>
                      Contact informations
                    </h2>
                    <div className="flex">
                      <div className="flex ml-1 flex-col justify-start items-start w-[15%] ">
                        <span className="text-slate-400 p-1">name:</span>
                        <span className="text-slate-400 p-1">Id:</span>
                      </div>
                      <div className="flex ml-1 flex-col justify-end items-start  ">
                        <h1 className="text-slate-200 ml-2 p-2 text-sm">
                          {selectedGroupMemberData.name}
                        </h1>
                        <h1 className="text-slate-200 ml-2 p-1 text-sm">
                          {selectedGroupMemberData._id}
                        </h1>
                      </div>
                    </div>
                    <div className=" w-10/12">
                      <div
                        onClick={() => {
                          setContact({
                            ...selectedGroupMemberData,
                            type: "contact",
                          });
                        }}
                        className="ml-4 pl-2 items-center justify-center flex pr-2 p-1 rounded-md cursor-pointer mt-2 text-slate-100 bg-teal-700"
                      >
                        <MessageSquare className="mr-1" />{" "}
                        <span>Message {selectedGroupMemberData.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {/* Media container */}
              <h2 className="text-slate-200 text-md ml-12 mt-6 mb-4">Media</h2>

              <div className="w-8/12 h-48 overflow-y-scroll pl-3 pr-3 ml-12 justify-center  flex-wrap flex gap-1">
                {media.length === 0 ? (
                  <div className="flex flex-col justify-center items-center">
                    <Image className="text-slate-700" size={42} />
                    <h1 className="text-slate-400">There is no media found</h1>
                  </div>
                ) : (
                  media.map((data) => (
                    <img
                      key={data}
                      className="w-14 h-14 -scroll-mt-40 object-contain hover:scale-150 transition-transform cursor-pointer"
                      src={data}
                      alt="media"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // desktop version
        <div className="w-2/6">
          {data.name !== "" ? (
            loading ? (
              <ContactSkeleton />
            ) : (
              <div
                className={` bg-background w-full h-full flex flex-col justify-start transition-transform ease-in-out duration-500`}
              >
                <div className="  flex flex-col justify-center items-center w-full">
                  <div className="relative w-20">
                    <img
                      className=" rounded-full w-20 mt-10"
                      src={contact.profileImagePath}
                    />

                    <div
                      className={`${
                        isUserOnline ? "scale-100" : "scale-0"
                      } transition-transform duration-100 ease-out w-4 h-4 bg-emerald-500 absolute bottom-0 rounded-full right-2 border-gray-800 border-2`}
                    >
                      {isUserOnline}
                    </div>
                  </div>
                </div>

                <h1 className="mt-8 text-slate-200 text-xl mb-4  ml-auto mr-auto ">
                  {data.name}
                </h1>

                {/* ID container */}

                <div className="flex mt-4 w-4/5 ml-auto mr-auto justify-evenly">
                  <h3 className="text-slate-300">ID</h3>
                  <span className="text-slate-400">{data._id}</span>
                </div>

                <div className="bg-slate-900 mt-10 mr-auto ml-auto w-10/12 h-[0.1rem]"></div>
                {/* group contacts container */}
                <div className="overflow-y-auto h-[67rem]">
                  {groupMembers.length !== 0 && contact.type === "group" ? (
                    <div
                      onMouseLeave={() => {
                        setSelectedGroupMember(-1);
                        setSelectedGroupMemberData({});
                      }}
                      className=""
                    >
                      <h2 className="text-slate-200 text-md ml-12 mt-6 mb-4">
                        Conversation members
                      </h2>
                      <div className="flex justify-evenly w-[70%] overflow-x-auto overflow-y-hidden">
                        {groupMembers.map((data, index) => (
                          <div key={data.name} className="p-1 w-14 m-1">
                            <img
                              onMouseEnter={() => {
                                setSelectedGroupMemberData(data);
                                setSelectedGroupMember(index);
                              }}
                              className="cursor-pointer rounded-md hover:scale-150 transition-transform duration-100 object-contain"
                              src={data.profileImagePath}
                            />
                          </div>
                        ))}
                      </div>
                      <div
                        className={`${
                          selectedGroupMember === -1
                            ? "h-0 opacity-0"
                            : "h-[99%]"
                        } transition-all duration-300 ease-out overflow-hidden`}
                      >
                        <h2
                          className={`text-slate-200 text-sm ml-12 mt-6 mb-4 `}
                        >
                          Contact informations
                        </h2>
                        <div className="flex">
                          <div className="flex flex-col justify-center items-end w-[20%] mr-2">
                            <span className="text-slate-400">name:</span>
                            <span className="text-slate-400">Id:</span>
                          </div>
                          <div>
                            <h1 className="text-slate-200">
                              {selectedGroupMemberData.name}
                            </h1>
                            <h1 className="text-slate-200">
                              {selectedGroupMemberData._id}
                            </h1>
                          </div>
                        </div>
                        <div className=" w-6/12">
                          <div
                            onClick={() => {
                              setContact({
                                ...selectedGroupMemberData,
                                type: "contact",
                              });
                            }}
                            className="ml-4 pl-2 items-center justify-center flex pr-2 p-1 rounded-md cursor-pointer mt-2 text-slate-100 bg-teal-700"
                          >
                            <MessageSquare className="mr-1" />{" "}
                            <span>Message {selectedGroupMemberData.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {/* Media container */}
                  <h2 className="text-slate-200 text-md ml-12 mt-6 mb-4">
                    Media
                  </h2>

                  <div className="w-8/12 h-48 overflow-y-scroll pl-3 pr-3 ml-12 justify-center  flex-wrap flex gap-1">
                    {media.length === 0 ? (
                      <div className="flex flex-col justify-center items-center">
                        <Image className="text-slate-700" size={42} />
                        <h1 className="text-slate-400">
                          There is no media found
                        </h1>
                      </div>
                    ) : (
                      media.map((data) => (
                        <img
                          key={data}
                          className="w-14 h-14 -scroll-mt-40 object-contain hover:scale-150 transition-transform cursor-pointer"
                          src={data}
                          alt="media"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}

export default React.memo(ContactInformation);
