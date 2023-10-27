import {createSlice} from '@reduxjs/toolkit'
import { Signin, signup } from './CRUD'

export interface Auth {
    message : string,
    success : boolean,
}

export const initialState:Auth = {
    message : '',
    success : true,
}

export const auth = createSlice({
    name : "auth",
    initialState,
    reducers : {setMessage : (state)=>{
        state.message = '',
        state.success = true },
                
        setUser : (state,action)=>{
            console.log(action.payload)
            state
                                  }
            },
    extraReducers(builder) {
        builder.addCase(signup.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.message = action.payload.message
            state.success = action.payload.success
        }),
        builder.addCase(Signin.fulfilled,(state,action)=>{
            state.message = action.payload.message
            state.success = action.payload.success
            // if(action.payload.success) localStorage.setItem('profile',JSON.stringify({...action.payload.result,...action.payload.token}))
        })
    },
})

export const AuthReducer = auth.reducer
export const {setMessage} = auth.actions