import { useEffect, useState } from 'react'
import {Outlet,NavLink,useLocation, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import { getListing } from '../features/CRUD'
import decode from 'jwt-decode'
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {


  let location = useLocation()
  let dispatch = useDispatch<AppDispatch>()
  let user = JSON.parse(localStorage.getItem('profile')!)
  let [searchTerm,setSearchTerm] = useState('')
  let navigate = useNavigate()
  interface Decode {
    email:string,
    id : string,
    iat : number,
    exp : number
  }

  useEffect(()=>{
    dispatch(getListing())
    let token = user?.token
    if(token){
      const decodedTokent:Decode = decode(token)

      if(decodedTokent.exp*1000 < new Date().getTime()){
        localStorage.clear()
      }
    }
  },[location])

  const handleSearch = (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    navigate(`/search?searchTerm=${searchTerm}`)
  }

  return (<>
    <div className="border-b lg:justify-around shadow-md flex justify-between h-16 items-center w-full md:w-8/10 px-5 gap-2 sm:0 md:mx-auto bg-slate-200">
        <NavLink to={'/'} ><p className="text-slate-600 w-auto font-bold text-md sm:text-xl">ProFound<span className="text-gray-800 ">Properties</span></p></NavLink>
        <div className='flex items-center relative border pr-2 rounded-lg'>
          <input name='searchTerm' value={searchTerm } onChange={(e)=>{setSearchTerm(e.target.value)}} placeholder="Search..." type="text" className="text-sm sm:text-md md:w-80 outline-none sm:w-52 p-2 rounded-lg w-40" />
          <button onClick={handleSearch}><SearchIcon className='cursor-pointer absolute top-2 right-3'/></button>
        </div>
        <div className="flex  sm:gap-4 justify-start text-gray-800 items-center text-md">
            <NavLink className={({isActive})=>(isActive ? '  font-semibold underline ': '  ')+(' hidden sm:inline-flex')} to={'/'}>
              <button className='hover:underline'>Home</button>
            </NavLink>
            <NavLink to={'/about'} className={({isActive})=>(isActive ? 'invisible sm:visible font-semibold underline': 'invisible sm:visible hover:underline ') + (' hidden sm:inline-flex')} > <button className='hover:underline'>About</button> 
            </NavLink>
            { !user && <NavLink className={({isActive})=>(isActive ? ' font-semibold underline': ' hover:underline ')} to={'/auth'}>
                <button className='whitespace-nowrap'>Sign In</button>
            </NavLink>}
            { user && <NavLink to={'/profile'}>
            <img src="https://e7.pngegg.com/pngimages/782/114/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users.png" className="h-8 w-8 rounded-full" />
            </NavLink>}

        </div>
    </div>
    <Outlet />
    </>
  )
}

export default Navbar