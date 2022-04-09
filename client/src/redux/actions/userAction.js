import ACTIONS from './index'
import { userRequest } from '../../requestMethods'

export const fetchAllUsers = async (token) => {
    const res = await userRequest.get('user/all_infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}