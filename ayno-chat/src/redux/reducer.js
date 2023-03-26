
export let reducer = {
    setContact:(state,action)=>{
                
            state.contact = action.payload   
    },
    setNotifications:(state,action)=>{
        state.notifications = action.payload
    },
    setUser:(state,action)=>{
        state.user = action.payload
    },
    setFriend:(state,action)=>{
        state.friend = action.payload
    }
}