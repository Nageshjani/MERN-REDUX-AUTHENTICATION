import React,{useState}  from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import './auth.css'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { useSelector } from 'react-redux'

import {useDispatch} from 'react-redux'
import { userRequest } from '../../../requestMethods'


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

const Login = () => {
    const [user, setUser] = useState(initialState)
    const {email,password , err, success}=user
    const isLogged=useSelector(state=>state.auth)

    const navigate= useNavigate()
    
    const dispatch=useDispatch()
    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await userRequest.post('user/login', {email, password})
            alert("hi")
            console.log(res)
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)
            dispatch(dispatchLogin())
            navigate('/')

            
            

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    
    const responseGoogle = async (response) => {
        try {
            //console.log(response)
            const res = await userRequest.post('user/google_login', {tokenId: response.tokenId})
            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            navigate('/')
            setUser({...user, error:'', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseFacebook = async (response) => {
        try {
            const {accessToken, userID} = response
            const res = await userRequest.post('user/facebook_login', {accessToken, userID})
            
            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            navigate('/')
            setUser({...user, error:'', success: res.data.msg})
            
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
  return (
    <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            

            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your password?</Link>
                </div>
                <GoogleLogin
                    clientId="28082087662-mjsbk2g7vn4q72onnu1va1gc4rgq6ank.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                appId="1030228797849649"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
                
            </form>

            

            <p>New Customer? <Link to="/register">Register</Link></p>
        </div>
  )
}

export default Login

/*

login.js

handleSubmit 

import {dispatchLogin} from '../../../redux/actions/authAction'


dispatch(dispatchLogin())


import ACTIONS from './index'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}


const ACTIONS = {
    LOGIN: 'LOGIN',
    
}

export default ACTIONS

*/