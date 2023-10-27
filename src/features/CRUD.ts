import axios from "axios";
import {createAsyncThunk} from '@reduxjs/toolkit'

const API = axios.create({baseURL : 'https://real-estate-backend-ndim.onrender.com'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')!).token}`
    }
    return req
})

export const signup = createAsyncThunk('/user/auth/signup',async (data:any)=>{
    const res = await API.post('user/auth/signup',data)
    if(res.data.success){
        localStorage.setItem('profile',JSON.stringify({result:res.data.result,token:res.data.token}))
    }
    return res.data
})

export const Signin = createAsyncThunk('user/auth/signin',async (data:any)=>{
    const res = await API.post('user/auth/signin',data)
    if(res.data.success){
        localStorage.setItem('profile',JSON.stringify({result:res.data.result,token:res.data.token}))
    }
    
    return res.data
})

export const updateUser = createAsyncThunk('user/update',async(data:any)=>{
    const res = await API.patch(`user/${data._id}/update`,data)
    console.log(res.data)
})

export const deleteUser = createAsyncThunk('user/delete',async(id:any)=>{
    console.log(id)
    await API.delete(`user/${id}`)
})

export const createListing = createAsyncThunk('post/listings/',async(data:any)=>{
    const res = await API.post('listings/',data)
    console.log(res.data)
    
})

export const getListing = createAsyncThunk('getListings',async ()=>{
    const res = await API.get('listings/')
    return res.data
})

export const deleteListing = createAsyncThunk('deleteListing',async (id:any)=>{
    const res = await API.delete(`listings/${id}`)
    return res.data
})

export const uploadListing = createAsyncThunk('updateListing',async(listing:any)=>{
     await API.patch(`listings/${listing._id}`,listing)
})
