import RoomIcon from '@mui/icons-material/Room';

function ListingCard({props} :any) {
    let {address,baths,beds,description,discountPrice,price,title,type} = props
    let imageUrl = props?.ImageURL[0]
  return (
    <div className="shadow-md gap-7 cursor-pointer border rounded-lg flex overflow-hidden bg-white flex-col justify-center w-full">
        <img src={imageUrl} className="h-[320px] sm:h-[220px] w-full object-fill hover:scale-105 transition-scale duration-300" />
        <div className='flex flex-col gap-2 px-3 mb-3'>
        <h1 className='truncate text-xl text-slate-600 font-semibold capitalize'>{title}</h1>
        <div className='truncate text-slate-500 items-center flex text-sm'><RoomIcon className='text-green-500' sx={{fontSize:16}} />{address}</div>
        <p className='text-slate-400 text-sm truncate'>{description}</p>
            {type === 'rent' ? <h1 className='text-lg font-bold text-slate-500'>${price - discountPrice} / month</h1> : <h2 className='text-lg font-bold text-slate-500'>${price-discountPrice}</h2>}
        <div className='flex gap-5 items-center text-xs font-bold'><p>{beds} {beds > 1 ? ' Beds':' Bed'} </p><p>{baths} {baths > 1 ? 'Baths' : 'Bath'}</p></div>
        </div>
    </div>
  )
}

export default ListingCard