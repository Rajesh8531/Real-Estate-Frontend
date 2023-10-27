import React, { useEffect, useState } from "react"
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { nanoid } from "nanoid"
import { storage } from "../features/firebase"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../app/store"
import { createListing, uploadListing } from "../features/CRUD"
import { useLocation, useNavigate } from "react-router-dom"


function CreateListing() {
    let navigate = useNavigate()
    let dispatch = useDispatch<AppDispatch>()
    let user = JSON.parse(localStorage.getItem('profile')!)
    let {state} = useLocation()

    let [listing,setListing] = useState({
        title : '',
        description : '',
        address : '',
        type : 'sell',
        parkingSpot : false,
        furnished : false,
        offer : false,
        beds : 1,
        baths : 1,
        price : 50,
        discountPrice : 0,
        ImageURL : ['']
    })

    useEffect(()=>{
        if(state){
           setListing(state) 
        }
        if(!user)navigate('/auth')
    },[])

    let [files,setFiles] = useState(Array<File>)
    let [loading,setLoading] = useState(false)

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement > | React.ChangeEvent<HTMLTextAreaElement> | React.BaseSyntheticEvent)=>{
        if(event.target.name === 'sell' || event.target.name == 'rent'){
            setListing(prev=>({...prev, type:event.target.name}))
        }

        else if(event.target.name == 'parkingSpot' || event.target.name == 'furnished' || event.target.name == 'offer'){
            setListing(prev=>({...prev,[event.target.name] : event.target.checked}))
        } else {
            setListing(prev=>({...prev,[event.target.name]:event.target.value}))
        }
    }


    const onSubmitHandler = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if(loading){
            console.log("Files were uploading...")
        } else {
            if(state){
                await dispatch(uploadListing(listing))
            } else {
                await dispatch(createListing(listing))
            }
            navigate('/search')
        }
    }

    const onSubmitUpload = ()=>{
        if(files.length > 0 && files.length + listing.ImageURL.length < 7){
            let array:string[] = []
            files.forEach(async (item)=>{
            setLoading(true)
            let imageRef = ref(storage,`images/${nanoid()}`)
            await uploadBytes(imageRef,item)
            await getDownloadURL(imageRef).then((url)=>{array.push(url)
                    setListing(prev=>({...prev,ImageURL:[...array]}))
                })
            setLoading(false)
            })
        } else {
            console.log("No image were uploaded")
        }     
    }


  return (
    <main className="p-2">
        <h1 className="text-3xl text-center font-bold my-8">{state ? 'Update a Listing' : 'Create a Listing'}</h1>
        <form onSubmit={onSubmitHandler} className=" flex flex-col lg:flex-row mx-auto w-[500px] gap-4 sm:w-[1050px]">
            <div className="w-[500px] flex flex-col gap-5 ">
                <input onChange={onChangeHandler} className="p-3 border rounded-lg w-[94%] " type="text" placeholder="Name" name="title" value={listing.title ?? '' } />
                <textarea  onChange={onChangeHandler} placeholder="Description" className="w-[94%] p-3 border rounded-lg  " rows={5}  name="description" value={ listing.description ?? ''} />
                <input  onChange={onChangeHandler} className="p-3 border rounded-lg w-[94%]" type="text" placeholder="Address" name="address" value={listing.address ?? ''} />
                <div className="flex flex-wrap  gap-x-12 gap-y-4">
                    <div className="flex gap-2"><input onChange={onChangeHandler}  className="w-5 h-5" type="checkbox" name="sell" checked={listing.type == 'sell' ?? ''} /><p> Sell</p></div>
                    <div className="flex gap-2"><input onChange={onChangeHandler}  className="w-5 h-5" type="checkbox" name="rent" checked={listing.type == 'rent' ?? ''} /><p> Rent</p></div>
                    <div className="flex gap-2"><input onChange={onChangeHandler}  className="w-5 h-5" type="checkbox" name="parkingSpot" checked={listing.parkingSpot ?? ''} /><p> Parking spot</p></div>
                    <div className="flex gap-2"><input onChange={onChangeHandler}  className="w-5 h-5" type="checkbox" name="furnished" checked={listing.furnished ?? ''} /><p> Furnished</p></div>
                    <div className="flex gap-2"><input onChange={onChangeHandler}  className="w-5 h-5" type="checkbox" name="offer" checked={listing.offer ?? ''} /><p> Offer</p></div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-x-2 items-center"><input onChange={onChangeHandler}  className="w-24 px-3 h-12 border border-slate-400 rounded-lg " type="number" name="beds" value={listing.beds ?? ''} /><p>Beds</p></div>
                    <div className="flex gap-x-2 items-center"><input onChange={onChangeHandler}  className="w-24 px-3 h-12 border border-slate-400 rounded-lg " type="number" name="baths" value={listing.baths ? listing.baths : 0 } /><p>Baths</p></div>
                </div>
                <div className="flex gap-x-2 items-center"><input onChange={onChangeHandler}  className=" w-32 h-16 border border-slate-400 rounded-lg px-3" type="number" name="price" value={listing.price ?? ''} /><div className="flex flex-col "><p>Regular Price</p><p>{listing.type == 'rent' ? '$ / Month':' '}</p></div></div>
                {listing.offer && <div className="flex gap-x-2 items-center"><input onChange={onChangeHandler}  className=" w-32 h-16 border border-slate-400 rounded-lg px-3" type="number" name="discountPrice" value={listing.discountPrice ?? ''} /><div className="flex flex-col "><p>Discounted Price </p><p>{listing.type == 'rent' ? '$ / Month':' '}</p></div></div>}
            </div>
            <div className=" flex flex-col gap-5   w-[450px]">
                <p><span className="font-semibold text-slate-800">Images:</span> The first image will be the cover(max 6)</p>
                <div className="flex justify-between">
                    <input  className="border p-3 border-gray-400" type="file" accept='image/*'
              multiple onChange={(e)=>setFiles([...e.target.files])} />
                    <button type="button" className="border uppercase font-bold p-3 border-green-700 text-green-700 rounded-lg" onClick={onSubmitUpload} >{loading ? 'Uploading...' : 'Upload'}</button>
                </div>
                <button className="w-full font-bold uppercase text-center bg-slate-800 p-3 rounded-lg text-white" type="submit">{ state ? 'Update Lising' : 'Create Listing' }</button>
                <div className="flex flex-col gap-4">
                    {  listing.ImageURL[0] && listing.ImageURL.map((url)=>(
                        <div key={url} className="border flex items-center justify-between pr-3" >
                            <img src={url} className="w-40 h-16 m-2" />
                            <button onClick={()=>{
                                setListing(prev=>({...prev,ImageURL:listing.ImageURL.filter(item=>(item != url))}))
                            }} className="text-red-500 font-semibold border p-3 rounded-lg border-slate-400">Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    </main>
  )
}

export default CreateListing