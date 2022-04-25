import axios from "axios";
const SERVER_API_URL = "https://cs5610-final-yelp-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const addBookmark = async (uid, bid, bookmark) => {
    const response = await api.post(`${SERVER_API_URL}/bookmarks/${uid}/${bid}`, {bookmark})
    return response.data
}

export const findAllBookmarks = async () => {
    const response = await api.get(`${SERVER_API_URL}/bookmarks`)
    return response.data
}

export const findUserBookmarks = async (email) => {
    const response = await api.get(`${SERVER_API_URL}/bookmarks/email/${email}`)
    return response.data
}

export const deleteBookmark = async (uid, bid) => {
    const response = await api.delete(`${SERVER_API_URL}/bookmarks/${uid}/${bid}`)
    return response.data
}