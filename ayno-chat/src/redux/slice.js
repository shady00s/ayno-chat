
import {createSlice} from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { reducer } from './reducer'
export const masterSlice = createSlice({
    name:'data',
    initialState: initialState,
    reducers: reducer
}) 

export const {setNewContact,setNewFriend,setNotifications,setUser} = masterSlice.actions
export default masterSlice.reducer