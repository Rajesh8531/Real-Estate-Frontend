import { useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { RootState } from "../app/store"
import { SwiperSlide,Swiper } from "swiper/react"
import { Navigation, Pagination, A11y  } from 'swiper/modules';
import RoomIcon from '@mui/icons-material/Room';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ChairIcon from '@mui/icons-material/Chair';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from "react";

function ListingPage() {
    let {id} = useParams()
    let data = useSelector((store:RootState)=>store.listing.listings)
    let listing = data.find(item=>item._id === id)
    let urls = listing?.ImageURL
    let[message,setMessage] = useState(false)
    let user = JSON.parse(localStorage.getItem('profile')!)
  return (
    <div>
        <Swiper
        modules={[Navigation,Pagination,A11y]}
        spaceBetween={50}
        navigation
        pagination={{clickable:true}}
        slidesPerView={1}
        >
            {
                urls?.map(url=>(
                    <SwiperSlide key={url}>
                        <div
                            className='h-[550px]'
                            style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <div className="w-4/5 lg:w-2/5 gap-4 mx-auto flex flex-col my-10">
            <h1 className="text-3xl font-semibold">{listing?.title}</h1>
            <div className="flex items-center gap-2"><RoomIcon className="text-green-700" sx={{fontSize:16}} /><p className="text-sm font-semibold text-slate-500">{listing?.address}</p></div>
            <div className="flex items-center gap-3">
                <button className="uppercase font-semibold text-white bg-red-700 py-2 w-1/2 rounded-lg">for {listing?.type == 'sell' ? ' sale':'rent'}</button>
                <button className="uppercase font-semibold text-white bg-green-700 py-2 w-1/2 rounded-lg">{listing?.discountPrice ? `$${listing?.discountPrice}` : 'No '} Discount</button>
            </div>
            <p><span className="font-bold">Description : </span>{listing?.description}</p>
            <div className="flex flex-wrap font-semibold gap-4">
                <div className="text-green-800 flex items-center gap-1"><LocalHotelIcon className="text-green-800" sx={{fontSize:16}}/>{listing?.beds} Beds</div>
                <div className="text-green-800 flex items-center gap-1"><BathtubIcon className="text-green-800" sx={{fontSize:16}}/>{!listing?.baths ? '0': listing.baths} Baths</div>
                <div className="text-green-800 flex items-center gap-1"><LocalParkingIcon className="text-white bg-green-800" sx={{fontSize:16}}/>{listing?.parkingSpot ? ' Parking spot' : ' No Parking Spot'}</div>
                <div className="text-green-800 flex items-center gap-1"><ChairIcon className="text-green-800" sx={{fontSize:16}}/>{listing?.furnished ? ' Furnished' : ' Not Furnished'}</div>
            </div>
            {!message && user?.result && <button onClick={()=>setMessage(true)} className="w-full uppercase text-center bg-slate-800 hover:opacity-90 p-3 rounded-lg text-white font-semibold cursor-pointer">Contact landlord</button>}
            { message && <>
                <textarea rows={3} name="message" placeholder="Enter your message here..." className="w-full border rounded-lg p-2" />
                <NavLink to={`mailto:asdf`} className="w-full items-center p-3 text-white font-semibold rounded-lg bg-slate-700 uppercase hover:opacity-95">Send message</NavLink>
              </>}
        </div>
    </div>
  )
}

export default ListingPage