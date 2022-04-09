import ACTIONS from "./index";
import { userRequest } from "../../requestMethods";
export const dispatchLogin=()=>{
    return{
        type:ACTIONS.LOGIN
    }
}
export const dispatch = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,


        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}
export const fetchUser = async (token) => {
    const res = await userRequest.get('user/infor', {
        headers: {Authorization: token}
    })
    return res
}    