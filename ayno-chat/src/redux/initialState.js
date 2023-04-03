

export const initialState = {
    contact:{
        _id:null,
        name:"",
        profileImagePath:"",
        conversations:[],
        type:''
    },

    notifications:{
        groupNotifications:[],
        messageNotifications:[],
        friendsNotifications:[],
        friendRequestsNotifications:[],
        newGroupNotifications:[]
    },
    newGroup:{
        _id:null,
        conversation_id:null,
        members_ids:[],
        conversation_name:""
    },
    user:{
        id:null,
        name:"",
        profileImagePath:"",
    },
    friend:{
        data:{
            _id:null,
        name:"",
        profileImagePath:"",
        conversations:[]
        },
        type:"",
        friendType:''
        
    }
}