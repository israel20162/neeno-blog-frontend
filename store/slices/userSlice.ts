import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAction, } from "@reduxjs/toolkit";
//import localStorage from 'redux-persist/es/storage';




// 
//const user = JSON.parse(localStorage.getItem("user") || '');


export interface UserState {
    token: string
    userData: Object
    upvotes:Array<Object>
    downvotes:Array<Object>
    postId:number
}

const initialState: UserState = {
    token: '',
    userData: {},
    postId:null,
    upvotes:[],
    downvotes:[]
}


export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout: () => initialState,
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<Object>) => {
            state.userData = action.payload;
        },
        setPostID: (state, action: PayloadAction<number>) => {
            state.postId = action.payload;
        },
        setUpVote: (state, action: PayloadAction<vote>) => {
            const votedComment= state.upvotes.find(
                (item:vote) => item.id === action.payload.id
            );
            if (votedComment) {
                votedComment
            } else {
                state.upvotes.push({...action.payload });
            }

        },
        setDownVote: (state, action: PayloadAction<vote>)=>{
            const votedComment = state.downvotes.find(
                (item: vote) => item.id === action.payload.id
            );
            if (votedComment) {
                votedComment
            } else {
                state.downvotes.push({ ...action.payload });
            }

        }
    },
});

export default userSlice.reducer;

export const { logout, setToken, setUser, setPostID, setUpVote, setDownVote } = userSlice.actions;
