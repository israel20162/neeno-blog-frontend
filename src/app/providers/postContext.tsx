'use client'
import {createContext,useState} from 'react'

export const PostContext = createContext(null)

export const PostContextProvider = ({children})=>{
    const[postId,setPostId]=useState(null)

    return(
        <PostContext.Provider value={{postId,setPostId}}>
        {children}
        </PostContext.Provider>
    )

}