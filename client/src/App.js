import {useEffect} from 'react'
import './App.css';
import {useDispatch, useSelector} from 'react-redux'
import { dispatchLogin,dispatchGetUser,fetchUser } from './redux/actions/authAction';
import Login from './components/body/auth/Login';
import ForgotPassword from './components/body/auth/ForgotPassword';
import ResetPassword from './components/body/auth/ResetPassword';
import Register from './components/body/auth/Register';
import ActivationEmail from './components/body/auth/ActivationEmail';
import Header from './components/header/Header';
import Profile from './components/body/profile/Profile';
import EditUser from './components/body/profile/EditUser';
import NotFound from './NotFound'
import {
  
  Routes,
  Route,
} from "react-router-dom";

import { userRequest } from './requestMethods';

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin} = auth
  console.log(isLogged)
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
    const getToken = async () => {
        const res = await userRequest.get('/user/refresh_token')
        dispatch(dispatchLogin())
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
    }
    getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
    const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
        dispatch(dispatchGetUser(res))
        })
        //console.log('res',res)
    }
    getUser()
    }
  },[token, dispatch])
  return (
        
      <Routes>
         <Route path="/"
            element= {<Header />}>
          </Route>
          <Route path="/login"
            element= {isLogged?<NotFound /> :<Login /> }>
          </Route>
          <Route path="/forgot_password"
            element= {isLogged?<NotFound /> :<ForgotPassword />}>
          </Route>
          <Route path="/user/reset/:id"
            element= {isLogged?<NotFound /> :<ResetPassword />}>
          </Route>
          <Route path="/register"
            element= {isLogged?<NotFound /> :<Register />}>
          </Route>
          <Route path="/user/activate/:activation_token"
            element= {isLogged?<NotFound /> :<ActivationEmail />}>
          </Route>
          <Route path="/profile"
            element= {isAdmin?<Profile /> :<NotFound />}>
          </Route> 
          <Route path="/edit_user/:id"
            element= {isAdmin?<EditUser /> :<NotFound />}>
          </Route>


      </Routes>

   
    
  )
}

export default App;
