import React, { useEffect, useState } from "react"
import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"
import {useDispatch,useSelector} from 'react-redux'
import { AppDispatch, RootState } from "../app/store"
import { Signin, signup } from "../features/CRUD"
import { useNavigate } from "react-router-dom"
import { setMessage } from "../features/auth"

function Auth() {

    const dispatch = useDispatch<AppDispatch>()
    let navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('profile')!)
    let [signin,setSignin] = useState(true)


    let [userData,setUserData] = useState( signin ? {
      email : '',
      password : ''
    } : {
      name : '',
      email : '',
      password :'',
      confirmPassword : ''
    } )
    let message = useSelector((store:RootState)=>store.auth.message)

    const loginSuccess =async (res:any)=>{
      let result = await res.profileObj
      let token = await res.tokenId
      localStorage.setItem('profile',JSON.stringify({result,token}))
      navigate('/')
    }
    const loginFailed = (err:any)=>{
      console.log(err)
    }

    useEffect( ()=>{
      function start() {
        gapi.client.init({
        clientId:import.meta.env.VITE_API_GOOGLE_ID,
        scope: 'email',
          });
           }
           gapi.load('client:auth2', start)
          
        if(user?.result)navigate('/profile')

    },[signin])

    const onChangeHandler = (event : React.ChangeEvent<HTMLInputElement>)=>{
      setUserData(prev =>({...prev,[event.target.name] :event.target.value}) )
    }

    const onSubmitHandler =async (event:React.FormEvent)=>{
      event.preventDefault()
      if(!signin){
        let res = await dispatch(signup(userData))
        if(res.payload.success) {
          
          navigate('/')}
      } else {
        let res = await dispatch(Signin(userData))
        if(res.payload.success) navigate('/')
      }
    }

  return (
    <>
    <div className="w-[500px] px-4 sm:px-0 mx-auto flex flex-col my-16 gap-8">
    <h1 className="text-3xl font-semibold text-center">{ signin ? 'Sign In' : 'Sign Up'}</h1>
    <form className="flex flex-col gap-3" onSubmit={onSubmitHandler} >
        { !signin && <input required name="name" onChange={onChangeHandler} value={userData.name}  type="text" placeholder="Name"  className="p-3 font-semibold border rounded-lg" />}
        <input required name="email" value={userData.email} onChange={onChangeHandler} type="email" placeholder="Email" className="p-3 font-semibold border rounded-lg" />
        <input required name="password" value={userData.password} onChange={onChangeHandler} type="password"  placeholder="Password"  className="p-3 font-semibold border rounded-lg" />
        {signin && message && <p className="text-md font-semibold text-red-500 ">{message}</p>}
        {!signin && <input required name="confirmPassword" value={userData.confirmPassword} onChange={onChangeHandler} type="password" placeholder="Confirm Password"  className="p-3 font-semibold border rounded-lg" />}
        {!signin && message && <p className="text-md font-semibold text-red-500 ">{message}</p>}
        <button type="submit" className="p-3 rounded-lg text-white w-full text-center font-medium uppercase bg-slate-800">{signin ? 'Sign in' : 'Sign up '}</button>
        <GoogleLogin clientId={import.meta.env.VITE_API_GOOGLE_ID}
        onSuccess={loginSuccess}
        onFailure={loginFailed}
        render={(renderProps) => (
          <button disabled={renderProps.disabled} onClick={renderProps.onClick} type="button" className="p-3 rounded-lg text-white w-full text-center font-medium uppercase bg-red-600">continue with google</button>
        )}
        />
    </form>
    <p>Dont Have an account? <button className="text-blue-500" onClick={()=>{
      setSignin(prev=>!prev)
      dispatch(setMessage())
      }}>{signin ? 'Sign Up':'Sign In'}</button></p>
    </div>
    </>
  )
}

export default Auth