import axios from "axios";
const SERVER_API_URL = "https://cs5610-final-yelp-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const addFollowing = async (uid, fuid, following) => {
    const response = await api.post(`${SERVER_API_URL}/followings/${uid}/${fuid}`, {following})
    return response.data
}

export const findAllFollowings = async () => {
    const response = await api.get(`${SERVER_API_URL}/followings`)
    return response.data
}

export const findUserFollowings = async (email) => {
    const response = await api.get(`${SERVER_API_URL}/followings/email/${email}`)
    return response.data
}

export const deleteFollowing = async (uid, fuid) => {
    const response = await api.delete(`${SERVER_API_URL}/followings/${uid}/${fuid}`)
    return response.data
}