import './App.css';
import '../src/vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css';
import '../src/vendors/fontawesome-free-5.15.4-web/css/all.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signin from './screens/sign-in'
import Signup from './screens/sign-up'
import Profile from "./screens/profile";
import YelpDetails from "./screens/yelp-details";
import Search from "./search/search";
import SecureRoute from "./components/secure-route";
import {SearchProvider} from "./context/search-context";
import {ProfileProvider} from "./context/profile-context";
import SearchBar from "./components/search-bar";
import Nav from "./components/nav";
import React from "react";

function App() {
  return (
      <div>
          <SearchProvider>
              <ProfileProvider>
                  <BrowserRouter>
                      <div className="container row">
                          <SearchBar/>
                          <div className="col-2">
                              <Nav/>
                          </div>
                          <div className="col-10">
                              <Routes>
                                  <Route path="/signup" element={<Signup/>}/>
                                  <Route path="/signin" element={<Signin/>}/>
                                  <Route path="/profile" element={
                                      <SecureRoute>
                                          <Profile/>
                                      </SecureRoute>
                                  }/>
                                  <Route path="/search" element={<Search/>}/>
                                  <Route path="/details/:businessId" element={<YelpDetails/>}/>
                                  <Route path="/search/:locationSearch/:businessSearch" element={<Search/>}/>
                              </Routes>
                          </div>
                      </div>
                  </BrowserRouter>
              </ProfileProvider>
          </SearchProvider>
      </div>
  );
}

export default App;
