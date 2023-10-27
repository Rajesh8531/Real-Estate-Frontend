import { NavLink } from "react-router-dom"
import { SwiperSlide,Swiper } from "swiper/react"
import { Navigation,Pagination, A11y  } from 'swiper/modules';
import { Urls,sorting,filterListings } from "../utils/sorting-and-filtering";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ListingItems from "../components/ListingItems";


let urls = Urls

function LandingPage() {

  let listings = useSelector((store:RootState)=>store.listing.listings)
  let recentListings = sorting('latest',listings).slice(0,5)
  let rentListings = filterListings(listings,{type:'rent',furnished:false,parking:false,offer:false,searchTerm:'',sort:''})
      rentListings = sorting('latest',rentListings).slice(0,5)
  let saleListings = filterListings(listings,{type:'sell',furnished:false,parking:false,offer:false,searchTerm:'',sort:''})
      saleListings = sorting('latest',saleListings).slice(0,5)

  return (
    <div className="flex flex-col mt-12">
        <div className="w-full px-3 sm:w-3/5 flex flex-col gap-8 mx-auto">
            <h1 className="text-3xl sm:text-6xl font-bold text-slate-700">Find your next <span className="text-slate-500"> perfect </span><br />place with ease</h1>
            <p className="text-xs text-gray-400 sm:text-sm">ProFround Properties will help you find your home fase, easy and comfortable <br />
            Our expert support are always available.</p>
            <NavLink to={'/search'} className={'font-bold text-sm text-indigo-800 w-28 hover:underline'} >Let's Start now...</NavLink>
        </div>
        <div className="w-full mt-12">
            <Swiper
            modules={[Navigation,A11y,Pagination]}
            spaceBetween={50}
            navigation
            pagination={{clickable:true}}
            slidesPerView={ 1 }
            >
                {
                    urls?.map(url=>(
                        <SwiperSlide key={url}>
                            <div
                                className='h-[550px] w-full '
                                style={{
                                    background: `url(${url}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
        <div className="w-full sm:w-3/5 mt-12 flex flex-col   mx-auto p-6">
            <ListingItems searchLink="/search?type=all" heading="Recent Offers" more="Show more offers..." listings={recentListings} />
            <ListingItems searchLink="/search?type=rent" heading="Recent places for rent" more="Show more places for rent..." listings={rentListings} />
            <ListingItems searchLink="/search?type=sell" heading="Recent places for sale" more="Show more places for sale..." listings={saleListings} />
        </div>
    </div>
  )
}

export default LandingPage