import './App.css';
import '../src/vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css';
import '../src/vendors/fontawesome-free-5.15.4-web/css/all.css';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import YelpSearch from "./screens/yelp-search";
import YelpDetails from "./screens/yelp-details";
import Search from "./search/search";
import {SearchProvider} from "./context/search-context";

function App() {
  return (
      <div>
          <SearchProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path="/search" element={<YelpSearch/>}/>
                      <Route path="/search/:businessSearch" element={<YelpSearch/>}/>
                      <Route path="/details/:businessId" element={<YelpDetails/>}/>
                      <Route path="/search/:locationSearch/:businessSearch" element={<Search/>}/>
                  </Routes>
              </BrowserRouter>
          </SearchProvider>
      </div>
  );
}

export default App;
