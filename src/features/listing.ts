import { createSlice } from "@reduxjs/toolkit"
import { createListing, deleteListing, getListing } from "./CRUD"

export interface Listing {
    ImageURL : string[],
    address : string,
    baths : number,
    _id : string,
    creator? : string,
    creatorName? : string,
    createdAt : string,
    beds : number,
    description : string,
    discountPrice : number,
    furnished : boolean,
    offer : boolean,
    parkingSpot : boolean,
    price : number,
    title : string,
    type : string
}

export interface Listings {
    listings : Listing[],
    loading : boolean,
    updateData? : Listing,
}

const initialState:Listings = {
    listings : [],
    loading: false,
    updateData : {ImageURL:[],address:'',baths:0,beds:0,createdAt:'',creator:'',creatorName:'',description:'',discountPrice:0,furnished:false,offer:false,parkingSpot:false,price:0,title:'',type:'',_id:''},
}


export const listingSlice = createSlice({
    name : 'listings',
    initialState,
    reducers : {},
    extraReducers(builder)  {
        builder.addCase(getListing.fulfilled, (state,action)=>{
            state.loading = false,
            state.listings = action.payload
        }),
        builder.addCase(createListing.fulfilled,(state)=>{
            state.loading = false
            // state.listings = [...state.listings,action.payload]
        }),
        builder.addCase(deleteListing.fulfilled,(state,action)=>{
            state.listings = state.listings.filter((item)=>item._id !== action.payload)
        })
    }
})

export default listingSlice.reducer

