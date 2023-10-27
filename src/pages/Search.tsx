import { useSelector } from "react-redux/es/hooks/useSelector"
import { RootState } from "../app/store"
import { useLocation, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import PaginatingItems from "../components/PaginatingItems"
import { filterListings, sorting } from "../utils/sorting-and-filtering.ts"

function Search() {

    let listings = useSelector((store:RootState)=>store.listing.listings)

    let [searchData,setSearchData] = useState({
        searchTerm : '',
        type : 'all',
        offer : false,
        parking : false,
        furnished : false,
        sort : 'latest'
    })

    listings = filterListings(listings,searchData)

    listings = sorting(searchData.sort,listings)

    listings = listings.filter(item=>{
        let re = new RegExp(searchData.searchTerm.toLowerCase())
        return re.test(item.title.toLowerCase()) || re.test(item.description.toLowerCase()) || re.test(item.address.toLowerCase())
    })

    let location = useLocation()

    let [searchParams,setSearchParams] = useSearchParams()

    useEffect(()=>{
        let searchTermFromURL = searchParams.get('searchTerm') 
        let typeFromURL = searchParams.get('type') 
        let offerFromURL = searchParams.get('offer') 
        let parkingFromURL = searchParams.get('parking')
        let furnishedFromURL = searchParams.get('furnished')
        let sortFromURL = searchParams.get('sort') 

        if(searchTermFromURL ||
            typeFromURL ||
            offerFromURL ||
            parkingFromURL ||
            furnishedFromURL ||
            sortFromURL
            ) {
            setSearchData({
                searchTerm : searchTermFromURL || '',
                type : typeFromURL || 'all',
                offer : offerFromURL == 'true' || false,
                parking : parkingFromURL == 'true' || false,
                furnished : furnishedFromURL == 'true' || false,
                sort : sortFromURL || 'latest'
            })
        }
    },[location.search])
    
    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setSearchParams({'searchTerm':searchData.searchTerm,
                        'type':searchData.type,
                        'offer':searchData.offer ? 'true' :'false',
                        'parking' : searchData.parking ? 'true' : 'false',
                        'furnished' : searchData.furnished ? 'true' : 'false',
                        'sort' : searchData.sort
                        })

    }

    const onChangeHandler = (e:React.BaseSyntheticEvent)=>{
        if(e.target.name == 'all' || e.target.name == 'rent' || e.target.name == 'sell'){
            setSearchData(prev=>({...prev,type:e.target.name}))
        } else if(e.target.type == 'checkbox') {
            setSearchData(prev=>({...prev,[e.target.name]:e.target.checked}))
        } else if(e.target.type == 'select-one') {
            setSearchData(prev=>({...prev,sort:e.target.value}))
        } else {
            setSearchData(prev=>({...prev,[e.target.name]: e.target.value}))
        }
    }

  return (
    <div className="flex flex-col sm:flex-row w-full">
        <div className=" w-full h-auto sm:w-[23%] border border-slate-300 sm:min-h-screen p-6">
            <form className="w-full flex flex-col gap-8" onSubmit={onSubmitHandler}>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-center"><p className="whitespace-nowrap">Search Term: </p> <input onChange={onChangeHandler} placeholder="Search" value={searchData.searchTerm ?? ''} type="text" className="border p-3 text-md w-full rounded-lg" name="searchTerm" /></div>
                <div className="flex flex-row flex-wrap items-center gap-4"><p>Type: </p>
                    <div className="flex gap-1 items-center"><input className="w-5 h-5 cursor-pointer" type="checkbox" onChange={onChangeHandler} checked={searchData.type === 'all' ?? ''} name="all" /><p>Rent & Sale</p></div>
                    <div className="flex gap-1 items-center"><input className="w-5 h-5 cursor-pointer" type="checkbox" onChange={onChangeHandler} checked={searchData.type == 'rent' ?? ''}  name="rent" /><p>Rent </p></div>
                    <div className="flex gap-1 items-center"><input className="w-5 h-5 cursor-pointer" type="checkbox" onChange={onChangeHandler} checked={searchData.type=='sell' ?? ''} name="sell" /><p>Sale</p></div>
                    <div className="flex gap-1 items-center"><input className="w-5 h-5 cursor-pointer" type="checkbox" onChange={onChangeHandler} checked={searchData.offer ?? ''} name="offer" /><p>Offer</p></div>
                </div>
                <div className="flex w-full flex-wrap items-center gap-4">
                    <p>Amenities: </p>
                    <div className="flex gap-2"><input className="w-5 h-5 cursor-pointer" type="checkbox" onChange={onChangeHandler} checked={searchData.parking ?? ''} name="parking" /><p>Parking</p></div>
                    <div className="flex gap-2"><input className="w-5 h-5 cursor-pointer" type="checkbox" onChange={onChangeHandler} checked={searchData.furnished ?? ''} name="furnished" /><p>Furnished</p></div>
                </div>
                <div className="flex  gap-4 flex-wrap items-center">
                    <p>Sort:</p>
                    <select value={searchData.sort} onChange={onChangeHandler} name="sort" className="p-3 cursor-pointer border rounded-lg w-28 md:w-auto" >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="price_asc">Price low to high</option>
                        <option value="price_desc">Price high to low</option>
                    </select>
                </div>
                {/* <button className="w-full p-3 font-semibold uppercase text-white bg-slate-700 rounded-lg " type="submit">Search</button> */}
            </form>
        </div>
        <div className="w-[77%] p-6 flex flex-col gap-7 ">
            <h1 className="text-3xl text-slate-600 font-semibold p-3 boder- h-12 ">Listing results:</h1>
            <div className="bg-slate-300 w-full h-[1px]"></div>
            {/* <div className="flex flex-wrap gap-8">
               { listings.length > 0 && listings.map((item)=>(
                <NavLink key={item._id} to={`/listing/${item._id}`}>
                    <ListingCard props = {item} />
                </NavLink>
               )) }
               
            </div> */}
            { listings.length > 0 && 
            <div className=" w-full flex flex-wrap">
                <PaginatingItems listings={listings} itemsPerPage={8} />
            </div>}
            {
                listings.length == 0 && <h1 className="text-3xl font-semibold items-center text-slate-500">No Listings Found</h1>
               }
        </div>
    </div>
  )
}

export default Search