import {Link} from "react-router-dom";

const Nav = () => {
    return(
        <div className={`list-group`}>
            <Link to="/home" className="list-group-item">Home</Link>
            <Link to="/bookmarks" className="list-group-item">Bookmarks</Link>
            <Link to="/followings" className="list-group-item">Followings</Link>
            <Link to="/signup" className="list-group-item">Signup</Link>
            <Link to="/signin" className="list-group-item">Signin</Link>
            <Link to="/profile" className="list-group-item">Profile</Link>
            <br/>
        </div>
    );
};
export default Nav;