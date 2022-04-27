import './App.css';
import '../src/vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css';
import '../src/vendors/fontawesome-free-5.15.4-web/css/all.css';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {combineProviders} from 'react-combine-providers';
import Signin from './screens/sign-in'
import Signup from './screens/sign-up'
import Profile from "./screens/profile";
import YelpDetails from "./screens/yelp-details";
import Search from "./search/search";
import SecureRoute from "./components/secure-route";
import {SearchProvider} from "./context/search-context";
import {ProfileProvider} from "./context/profile-context";

const providers = combineProviders();
providers.push(SearchProvider);
providers.push(ProfileProvider);
const MasterProvider = providers.master();

function App() {
  return (
      <div>
          <MasterProvider>
              <BrowserRouter>
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
              </BrowserRouter>
          </MasterProvider>
      </div>
  );
}

export default App;
