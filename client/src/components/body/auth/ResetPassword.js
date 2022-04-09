import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import { userRequest } from '../../../requestMethods'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
const isLength = password => {
    if(password.length < 6) return true
    return false
}

const isMatch = (password, cf_password) => {
    if(password === cf_password){
        return true
    } 
    else{
       
    return false
}
}
const ResetPassword = () => {
    const [data, setData] = useState(initialState)
    const param=useParams()
    const token =param.id
    const {password, cf_password, err, success} = data
    console.log(token,password,cf_password)

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }
    const handleResetPass = async () => {
        
        
        try {
            if(isLength(password))
            alert('Password must be at least 6 characters')

            if(!isMatch(password, cf_password))
            alert('Password did not match')

            const res = await userRequest.post('user/reset', {password}, {
                headers: {Authorization: token}
            })
            alert("success")

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }

    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>

            <div className="row">
                

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <label htmlFor="cf_password">Confirm Password</label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password}
                onChange={handleChangeInput} />         

                <button onClick={handleResetPass} >Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
