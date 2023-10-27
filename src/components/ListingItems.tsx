import { Listing } from "../features/listing"
import ListingCard from "./ListingCard"

import { SwiperSlide,Swiper } from "swiper/react"
import { Navigation,Pagination, A11y  } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from "react-router-dom";
import useWindowDimensions from "./useWindowDimension";

interface props {
    listings : Listing[],
    heading : string,
    more : string,
    searchLink : string
}

function ListingItems({listings,heading,more,searchLink}:props) {


  const { width} = useWindowDimensions() 
    // console.log(width)
  return (<div >
        <h1 className="text-2xl font-semibold text-gray-600">{heading}</h1>
        <NavLink to={searchLink} className={'text-sm text-indigo-800 hover:underline'}>{more}</NavLink>
        <div className="w-full  flex flex-wrap gap-6 mt-1">
            <Swiper
                modules={[Navigation,A11y,Pagination]}
                spaceBetween={50}
                pagination={{clickable:true}}
                slidesPerView={width <= 1024 ? 1 : width < 1500 ? 2 : 3 }
                >
                    {
                        listings.map(item=>(
                            <SwiperSlide key={item._id}>
                                <div key={item._id} className="mb-12">
                                    <NavLink to={`/listing/${item._id}`}>
                                        <ListingCard props={item} />
                                    </NavLink>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
        </div>
    </div>
  )
}

export default ListingItems