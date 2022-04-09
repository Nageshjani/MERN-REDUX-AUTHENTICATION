import React from 'react'
import './header.css'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { userRequest } from '../../requestMethods'

const Header = () => {
    const navigate=useNavigate()
   const auth = useSelector(state => state.auth)
   const {user, isLogged} = auth
   const handleLogout = async () => {
    try {
        await userRequest.get('user/logout')
        localStorage.removeItem('firstLogin')
        navigate('/')
        window.location.href='/'
    } catch (err) {
        window.location.href = "https://mern-full-auth.herokuapp.com";
    }
  }
  const userLink = () => {
    return <li className="drop-nav">
        <Link to="#" className="avatar">
        <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
        </Link>
        <ul className="dropdown">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
    </li>
}
    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }
    return (
        <header>
            <div className="logo">
                <h1><Link to="/">MERNN AUTH</Link></h1>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                
            </div>

            <ul style={transForm}>
                {
                    isLogged
                    ? userLink()
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }
                
            </ul>
        </header>
    )
}

export default Header

