import React, {useState} from 'react'
import { userRequest } from '../../../requestMethods'

const initialState = {
    email: '',
   
}
const ForgotPassword = () => {
    const [data, setData] = useState(initialState)

    const {email} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }
    
    const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
   }
   
   const forgotPassword = async () => {
    if(!isEmail(email))
        return setData({...data, err: 'Invalid emails.', success: ''})
        
    try {
        const res = await userRequest.post('user/forgot', {email})
        alert("check ypur email box to reset the password")

        return setData({...data, err: '', success: res.data.msg})
    } catch (err) {
        err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
    }
}
   
  return (
    <div className="fg_pass">
        <h2>Forgot Your Password?</h2>

        <div className="row">
            

            <label htmlFor="email">Enter your email address</label>
            <input type="email" name="email" id="email" value={email}
            onChange={handleChangeInput} />
            <button onClick={forgotPassword}>Verify your email</button>
        </div>
    </div>
  )
}

export default ForgotPassword
