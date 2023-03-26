import React, { useState,useContext } from 'react'
import { UserPlus, Slash } from 'react-feather'
import ApiCall from '../../../api_call'
import LoadingComponent from '../../../reusable-components/loading/loading_component'
import { useContext } from 'react';
import FriendContext from './../../../context/friendContext';
import SocketContext from "../../../context/socketContext"
export default function FriendRequestBody(props) {

    
    const [loading, setLoading] = useState(false)
    const { friend, setFriend } = useContext(FriendContext)

    const {socket}= useContext(SocketContext)
    function acceptFriendRequest() {
        setLoading(true)
        ApiCall.acceptFriendRequest(props.data._id).then(val => {
            alert('user added succssessfully')
            setLoading(false)
            props.removeFriendRequest(props.data)
            socket.emit('new-notification',{id:props.data._id ,...val.data.body,type:"new-friend"})
            setFriend({data:val.data.body,type:"add"})
        }).catch(err => {
            console.log(err)
            alert("There is an error, please try again")
            setLoading(false)
        })
    }

    function ignoreFriendRequest() {
        setLoading(true)

        ApiCall.ignoreFriendRequest(props.data._id).then(val => {
            if (val.status === 201) {
                alert('Friend request removed succssessfully')
                setLoading(false)

                props.removeFriendRequest(props.data)
            } else {
                alert('There is an error')
                setLoading(false)


            }
        }
        ).catch(err => {
            console.log(err)
            alert('There is an error, please try again later.')
            setLoading(false)
        })
    }
    return (

        <div className="bg-[rgba(123,167,243,0.06)] rounded-lg p-1 m-2 flex-col w-[96%] flex items-center justify-center">
            <div className="flex items-center w-[95%] pr-1 pt-1 pl-1">
                <img src={props.data.profileImagePath} className="w-10 h-10 rounded-full object-fill" />
                <h1 className=" text-ellipsis text-slate-200 pl-3">{props.data.name}</h1>
            </div>
            <span className="text-slate-400 text-sm mb-3 p-1">Send you a friend request</span>

            {/* button */}
            {loading ? <LoadingComponent /> : <div className="flex justify-evenly w-full">
                <button className=" p-1 pl-2 pr-2  rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm" onClick={() => {

                    acceptFriendRequest()
                }}><UserPlus className="mr-1 stroke-cyan-600" size={17} />Add Friend</button>
                <button
                    onClick={() => {
                        ignoreFriendRequest()
                    }

                    }

                    className=" p-1 pl-2 pr-2 rounded-md text-slate-300 border-2 border-slate-800 flex justify-center items-center text-sm"><Slash className="mr-1 stroke-pink-600" size={17} />Ignore</button>

            </div>}
        </div>

    )
}