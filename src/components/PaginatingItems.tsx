import { useState } from "react"
import { Listing } from "../features/listing"
import { NavLink } from "react-router-dom"
import ListingCard from "./ListingCard"
import ReactPaginate from "react-paginate"


interface items {
  listings : Listing[],
  itemsPerPage: number
}


function PaginatingItems({listings,itemsPerPage}:items) {

  let [itemOffset,setItemOffset] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const currentListings = listings.slice(itemOffset,endOffset)
  const pageCount = Math.ceil(listings.length / itemsPerPage)
  const handlePageClick = (event:any)=>{
    const newOffset = (event.selected * itemsPerPage) % listings.length
    setItemOffset(newOffset)
  }

  return (
    <>
  <div className={"w-full flex flex-wrap gap-6 " }>
      { currentListings.map((item)=>(
                <NavLink className={'w-full sm:w-[300px]'} key={item._id} to={`/listing/${item._id}`}>
                    <ListingCard props = {item} />
                </NavLink>
               )) }
      </div>
      <ReactPaginate
        className={'w-96 mx-auto flex my-8 items-center justify-center'+(currentListings.length < 5 && ' mt-[470px]')}
        breakLabel='...'
        nextLabel='Next '
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel={"Prev"}
        renderOnZeroPageCount={null}
        pageClassName='p-3 text-white border rounded-full bg-gray-600 hover:opacity-95 font-bold text-center'
        pageLinkClassName='p-3 '
        activeClassName='bg-yellow-400'
        previousClassName='p-3 mr-3 font-semibold text-white bg-green-800 uppercase rounded-full'
        nextClassName='ml-3 bg-red-700 p-3 font-semibold uppercase text-white rounded-full'
        breakClassName='p-3 font-bold text-center'
      />
    </>
  )
}

export default PaginatingItems