import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/search-bar";
import Nav from "../components/nav";
import * as bookmarkService from "../services/bookmark-service";
import * as reviewService from "../services/review-service";
import SecureContent from "../components/secure-content";
import {useProfile} from "../context/profile-context";
const BASE_DETAIL_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses";
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const YelpDetails = () => {
    const {profile} = useProfile()
    const [businessDetails, setBusinessDetails] = useState({})
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({
        userReview: '',
        userReviewRating: 5,
        userReviewDate: new Date()
    })
    const {businessId} = useParams();
    const navigate = useNavigate();
    const currEmail = profile ? profile.email : ''
    const currUid = profile ? profile.uid : ''
    const followed = async () => {
        if (profile) {
            const currUserBookmarks = await bookmarkService.findUserBookmarks(currEmail)
            return currUserBookmarks.includes(businessId)
        }
    }
    const getReviews = async () => {
        const currBusinessReviews = await reviewService.findBusinessReviews(businessId)
        setReviews(currBusinessReviews)
    }
    const handleBookmark = async () => {
        if (profile) {
            const currUserBookmarks = await bookmarkService.findUserBookmarks(currEmail)
            if (!followed) {
                await bookmarkService.addBookmark(currUid, businessId, currUserBookmarks)
            } else {
                await bookmarkService.deleteBookmark(currUid, businessId, currUserBookmarks)
            }
        }
    }
    const handlePostReview = async () => {
        await reviewService.postReview(newReview)
        navigate(`/details/${businessId}`)
    }
    const searchBusinessById = async () => {
        const response = await axios.get(`${BASE_DETAIL_URL}/${businessId}`,
            {headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                }});
        setBusinessDetails(response.data);
    }
    useEffect(()=>{
        searchBusinessById();
        getReviews();
    }, []);
    const reviewNumber = reviews.length || 0;
    const totalRatingsArr = reviews.map(review => review.userReviewRating ? review.userReviewRating : 0)
    const totalRatings = totalRatingsArr.length===0 ? 0 : totalRatingsArr.reduce((acc, review) => acc + review)
    const avgRating = reviewNumber===0 ? 0 : totalRatings/reviewNumber;
    return (
                <div className="row">
                    <img
                        className="ms-2 mt-4 col-2 float-end"
                        src={businessDetails.image_url}
                        height={180}/>
                    <div className="row col-10">
                        <h1 className="ms-2 mt-2">{businessDetails.name}</h1>
                        <p>
                            <div className="ms-2">Yelp Rating: {businessDetails.rating || ""}</div>
                            <div className="ms-2">Our Users Rating: {avgRating===0 ? "not available" : avgRating}</div>
                            <div className="ms-2">Price: {businessDetails.price || ""}</div>
                            <div className="ms-2">Address: {businessDetails.location ? businessDetails.location.display_address.join(", ") : "to be updated"}</div>
                            <div className="ms-2">Phone Number: {businessDetails.display_phone || ""}</div>
                            <div className="ms-2">Reviews: {reviewNumber}</div>
                        </p>
                        <SecureContent>
                            <button
                                className="btn btn-primary ms-3 col-4"
                                onClick={handleBookmark}>Add to Bookmark</button>
                        </SecureContent>
                    </div>
                    <div className="container">
                        <h1 className="ms-2 mt-2">
                            Reviews
                        </h1>
                        <SecureContent>
                            <div className="row m-3">
                                <textarea className="me-3 col-8"
                                      onChange={(e) =>
                                          setNewReview({...newReview,
                                              userReview: e.target.value})}/>
                                <button onClick={handlePostReview}
                                        className="btn btn-primary ms-3 col-2 float-end">
                                    Post
                                </button>
                            </div>
                        </SecureContent>
                        <ul className="list-group">
                            {
                                reviews.map && reviews.map(review =>
                                    <div className="list-group-item">
                                        <div>
                                            Posted by User: {review.firstName + " " + review.lastName}
                                        </div>
                                        <div>
                                            Review: {review.userReview}
                                        </div>
                                        <div>
                                            Rating: {review.userReviewRating}
                                        </div>
                                        <div>
                                            Review Date: {review.userReviewDate}
                                        </div>
                                    </div>
                                )
                            }
                        </ul>
                    </div>
                </div>
    );
};

export default YelpDetails;