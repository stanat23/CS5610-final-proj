import {Link} from "react-router-dom";

const Nav = () => {
    return(
        <div className={`list-group`}>
            <Link to="/home" className="list-group-item">Home</Link>
            <Link to="/search" className="list-group-item">Search</Link>
            <Link to="/details" className="list-group-item">Details</Link>
            <br/>
        </div>
    );
};
export default Nav;