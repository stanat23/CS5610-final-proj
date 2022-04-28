import axios from "axios";
const SERVER_API_URL = "https://cs5610-final-yelp-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const postReview = async (uid, email,firstName, lastName, businessId, userReviewRating, userReview, userReviewDate) => {
    const response = await api.post(`${SERVER_API_URL}/reviews`, {uid, email, firstName, lastName, businessId, userReviewRating, userReview, userReviewDate})
    return response.data
}

export const findAllReviews = async() => {
    const response = await api.get(`${SERVER_API_URL}/reviews`)
    return response.data
}

export const findBusinessReviews = async (bid) => {
    const response = await api.get(`${SERVER_API_URL}/reviews/business/${bid}`)
    return response.data
}

export const findUserReviews = async (email) => {
    const response = await api.get(`${SERVER_API_URL}/reviews/email/${email}`)
    return response.data
}

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`${SERVER_API_URL}/reviews/${reviewId}`)
    return response.data
}