import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../app/store"
import { deleteListing, deleteUser } from "../features/CRUD"

function Profile() {
  let dispatch = useDispatch<AppDispatch>()
  let navigate = useNavigate()
  let [profileData,setProfileData] = useState({name:'',email:'',password:''})
  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{setProfileData(prev=>({...prev,[event.target.name]:event.target.value}))}
  let user = JSON.parse(localStorage.getItem('profile')!)
  let [showListing,setShowListing] = useState(false)
  let listings = useSelector((store:RootState)=>store.listing.listings)
  let userListings = listings.filter(item=>(item.creator == user?.result?._id || item.creator == user?.result?.googleId))

  useEffect(()=>{
    if(!user)navigate('/auth')
    if(user){setProfileData({name:user?.result?.name,email:user?.result?.email,password:''})}
  },[])

  return (
    <div className="w-4/5 sm:2/5  lg:w-1/4 mx-auto flex flex-col my-8 items-center justify-center gap-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">Profile</h1>
        <img src="https://e7.pngegg.com/pngimages/782/114/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users.png" className="h-16 w-16 rounded-full" />
        <form onSubmit={(e)=>{e.preventDefault()
                              // dispatch(updateUser({...profileData,_id:user?.result?._id}))                     
                        }}   className="flex flex-col gap-4 w-full" >
            <input onChange={onChangeHandler} name="name" value={profileData.name ?? ''} placeholder="Name" className="p-3 border w-full rounded-lg" type="text" />
            <input onChange={onChangeHandler} name="email" value={profileData.email ?? ''} placeholder="Email" className="p-3 border w-full rounded-lg" type="text" />
            <input onChange={onChangeHandler} name="password" value={profileData.password ?? ''} placeholder="Password" className="p-3 border w-full rounded-lg" type="password" />
            <button className="p-3 border w-full rounded-lg uppercase bg-slate-800 font-semibold text-white" type="submit">update</button>
        </form>
        <NavLink  className=" w-full " to={'/create-listing'}>
            <button className="p-3 border w-full rounded-lg uppercase bg-green-700 font-semibold text-white" type="button">create listing</button>
        </NavLink>
        <div className="flex w-full items-center justify-between">
            <button onClick={()=>{
              if(user?.result?._id) {dispatch(deleteUser(user?.result?._id))
              localStorage.clear()
              navigate('/auth')
              }
            }} className="text-red-500 border rounded-lg border-red-500 font-semibold text-md p-3" >Delete Account</button>

            <button onClick={()=>{localStorage.clear() 
                                  navigate('/auth')}} 
          className="text-red-500 border rounded-lg border-red-500 font-semibold text-md p-3" >Sign out</button>
        </div>
        {userListings.length > 0 && <button onClick={()=>setShowListing(prev=>!prev)} className="text-lg  font-semibold text-green-700">{showListing ? 'Hide Listing' : 'Show Listings '}</button>}
        <div className="flex flex-col w-full gap-3">
          {userListings && showListing && userListings.map(item=>(
            <div key={item._id} className="flex items-center justify-between p-2 border">
            <NavLink to={`/listing/${item._id}`}>
              <img src={item.ImageURL[0]}  className="h-20 w-28 cursor-pointer" />
            </NavLink>
              <div className="flex flex-col gap-2 justify-between items-stretch">
                <NavLink to={'/create-listing'} state={item}>
                    <button className="bg-green-700 text-white p-1 text-center border uppercase rounded-md font-semibold ">update</button>
                  </NavLink>
                  <button onClick={()=>dispatch(deleteListing(item._id))} className="bg-red-700 text-white p-1 text-center border uppercase rounded-md font-semibold ">delete</button>
              </div>
            </div>
          ))}
              
        </div>
    </div>
  )
}

export default Profile