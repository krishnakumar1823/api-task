import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const Redux=createSlice({
    name:"api",
    initialState:{
        arrayHomePage:[],
        arrayDetailPage:[],
        arraySearch:{}
    },
    reducers:{
        updateHomePage:(state,action)=>{
            state.arrayHomePage=action.payload
        },
        updateDetailPage:(state,action)=>{
            state.arrayDetailPage=action.payload
        },
        updateSearch:(state,action)=>{
            state.arraySearch=action.payload
        }
    }
})
export default Redux.reducer
export const{updateDetailPage,updateHomePage,updateSearch}=Redux.actions