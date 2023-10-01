import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'




export interface ThemeState {
    theme: boolean
}


const initialState: ThemeState = {
    theme: false,
}

export const themeSlice =  createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action:PayloadAction<boolean>) => {
            
            state.theme = action.payload
            
        }
        
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
