import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import * as bookmarkService from "../services/bookmark-service";
import * as reviewService from "../services/review-service";
import SecureContent from "../components/secure-content";
import {useProfile} from "../context/profile-context";
import Rating from 'react-rating';
const BASE_DETAIL_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses";
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const YelpDetails = () => {
    const {profile} = useProfile()
    console.log(profile ? profile.email : 'nope')
    const [businessDetails, setBusinessDetails] = useState({})
    const [reviews, setReviews] = useState([])
    const [newRating, setNewRating] = useState('0');
    const {businessId} = useParams();
    const [newReview, setNewReview] = useState('')
    const navigate = useNavigate();
    const getReviews = async () => {
        const currBusinessReviews = await reviewService.findBusinessReviews(businessId)
        setReviews(currBusinessReviews)
    }
    const handleAddBookmark = async () => {
        if (profile) {
            await bookmarkService.addBookmark(profile._id, businessId, profile.email).then(
                alert('added to bookmarks!')
            )
        }
    }
    const handleDeleteBookmark = async () => {
        if (profile) {
            await bookmarkService.deleteBookmark(profile._id, businessId).then(
                alert('removed from bookmarks!')
            )
        }
    }
    const handlePostReview = async () => {
        if (profile) {
            await reviewService.postReview(profile._id, profile.email, profile.firstName, profile.lastName, businessId, newRating, newReview, new Date())
            navigate(`/details/${businessId}`)
        }
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
                        className="ms-2 mt-4 col-3 float-end"
                        src={businessDetails.image_url}
                        height={180}/>
                    <div className="row col-5">
                        <h1 className="ms-2 mt-2">{businessDetails.name}</h1>
                        <div>
                            <div className="ms-2">Yelp Rating: {businessDetails.rating || ""}</div>
                            <div className="ms-2">Our Users Rating: {avgRating===0 ? "not available" : avgRating}</div>
                            <div className="ms-2">Price: {businessDetails.price || ""}</div>
                            <div className="ms-2">Address: {businessDetails.location ? businessDetails.location.display_address.join(", ") : "to be updated"}</div>
                            <div className="ms-2">Phone Number: {businessDetails.display_phone || ""}</div>
                            <div className="ms-2">Reviews: {reviewNumber}</div>
                        </div>
                    </div>
                    <div className="col-3">
                        <SecureContent>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={handleAddBookmark}>Add to Bookmark</button>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={handleDeleteBookmark}>Remove from Bookmark</button>
                        </SecureContent>
                    </div>
                    <div className="container">
                        <h1 className="ms-2 mt-2">
                            Reviews
                        </h1>
                        <SecureContent>
                            <div className="row m-2 mb-3">
                                <div className="container mb-3">
                                    <label className="mb-1" style={{fontSize: 18}}>Your Rating:</label><br/>
                                    <input type="radio" value="5"
                                           name="radio-genre" id="radio-rating"
                                           onChange={event => setNewRating(event.target.value)}
                                    />
                                    <label htmlFor="radio-rating" style={{fontSize: 22}} className="me-3"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></label>
                                    <input type="radio" value="4"
                                           name="radio-genre" id="radio-rating"
                                           onChange={event => setNewRating(event.target.value)}
                                    />
                                    <label htmlFor="radio-rating" style={{fontSize: 22}} className="me-3"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></label>
                                    <input type="radio" value="3"
                                           name="radio-genre" id="radio-rating"
                                           onChange={event => setNewRating(event.target.value)}/>
                                    <label htmlFor="radio-rating" style={{fontSize: 22}} className="me-3"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></label>
                                    <input type="radio" value="2"
                                           name="radio-genre" id="radio-rating"
                                           onChange={event => setNewRating(event.target.value)}/>
                                    <label htmlFor="radio-rating" style={{fontSize: 22}} className="me-3"><span>&#9733;</span><span>&#9733;</span></label>
                                    <input type="radio" value="1"
                                           name="radio-genre" id="radio-rating"
                                           onChange={event => setNewRating(event.target.value)}/>
                                    <label htmlFor="radio-rating" style={{fontSize: 22}} className="me-3"><span>&#9733;</span></label>
                                </div>
                                <textarea className="me-3 col-8"
                                      onChange={(e) =>
                                          setNewReview(e.target.value)}/>
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