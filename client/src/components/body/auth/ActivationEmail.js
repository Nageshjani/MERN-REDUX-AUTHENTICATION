import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { userRequest } from '../../../requestMethods'

function ActivationEmail() {
    const {activation_token} = useParams()
    const navigate=useNavigate()

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    await userRequest.post('user/activation', {activation_token})
                    alert("success")
                    navigate('/login')
                } catch (err) {
                    //err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div className="active_page">
            
        </div>
    )
}

export default ActivationEmail