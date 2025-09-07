import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../constants/const';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false); 
  };

  return (
    <>
      <div className="navbar bg-white/80 backdrop-blur shadow-md">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-indigo-900 text-xl font-bold">DevTinder</Link>
        </div>
        {user && (
          <div className="flex gap-2">
            <div className="relative dropdown dropdown-end flex">
              <div>
                <p className="text-indigo-900 px-4 mt-2 font-medium">Welcome, {user.firstName}</p>
              </div>
              <button
                onClick={handleToggle}
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-indigo-400 shadow">
                  <img alt="User avatar" src={user.photoURL} />
                </div>
              </button>
              {isOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white/95 text-indigo-900 rounded-box z-50 mt-3 w-52 p-2 shadow-lg absolute right-0"
                >
                  <li>
                    <Link to="/profile" className="justify-between font-medium" onClick={handleMenuClick}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections" onClick={handleMenuClick}>Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests" onClick={handleMenuClick}>Requests</Link>
                  </li>
                  <li>
                    <Link to="/premium" onClick={handleMenuClick}>Premium</Link>
                  </li>
                  <li>
                    <a onClick={() => { handleLogout(); handleMenuClick(); }}>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
