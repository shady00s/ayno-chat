import { configureStore } from "@reduxjs/toolkit";
import  masterSliceReducer  from "./slice";


export const store = configureStore({
    reducer:{
          data:masterSliceReducer
    }
})