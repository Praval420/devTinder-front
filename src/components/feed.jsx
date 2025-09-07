import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../constants/const";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const choose = useSelector((store) => store.feed);

  const getUsers = async () => {
    try {
      const users = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(users.data));
    } catch (err) {
      // Handle error appropriately
    }
  };

  useEffect(() => {
    if (!choose) {
      getUsers();
    }
  }, [choose]);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-indigo via-pink-500 to-red flex items-start justify-center p-2">
      {Array.isArray(choose) && choose.length > 0 ? (
        <UserCard user={choose[0]} />
      ) : Array.isArray(choose) && choose.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "20vh",
            fontSize: "1.5rem",
            color: "#ffffffff",
          }}
        >
          No more users
        </div>
      ) : null}
    </div>
    </>
  );
};

export default Feed;
