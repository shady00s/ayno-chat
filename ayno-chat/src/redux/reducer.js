
export let reducer = {
    setNewContact:(state,action)=>{
                
            state.contact = action.payload   
    },
    setNotifications:(state,action)=>{
        state.notifications = action.payload
    },
    setUser:(state,action)=>{
        state.user = action.payload
    },
    setNewFriend:(state,action)=>{
        state.friend = action.payload
    }
}