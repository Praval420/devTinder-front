import axios from "axios";
import { BASE_URL } from "../constants/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { addConnections } from "../utils/connectionsSlice";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Request = () => {
  const store = useSelector((store) => store.request);
  const dispatch = useDispatch();

  // Fetch received requests
  const handleRequest = async () => {
    try {
      const user = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequest(user.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch feed data
  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch updated connections after accepting requests
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  // Review request (accept/reject)
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id)); // Remove from request list
      if (status === "accepted") {
        await fetchConnections(); // Refresh connections on acceptance
      }
      await fetchFeed(); // Refresh feed
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!store || store.length === 0) {
      handleRequest();
    }
  }, []);

 return (
  <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 to-blue-800 flex flex-col">
    {store && store.length > 0 ? (
      <>
        <h1 className="fz-10 text-center text-4xl p-6 text-white">Requests</h1>
        <ul className="rounded-xl shadow-lg flex flex-col items-center w-full max-w-lg mx-auto p-4 mb-8 flex-grow overflow-auto">
          {store.map((z, index) => {
            const { _id, firstName, lastName, age, gender, photoURL } = z;
            return (
              <li
                key={_id || index}
                className="relative w-full max-w-md mx-auto mb-6 flex items-center bg-gradient-to-r from-indigo-700 to-blue-600 border-l-4 border-teal-300 gap-4 rounded-2xl p-5 shadow-lg"
              >
                <div className="text-3xl font-bold text-white opacity-50 tabular-nums mr-3">{index + 1}</div>
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  src={photoURL}
                  alt={`${firstName} ${lastName}`}
                />
                <div className="flex-1 text-white">
                  <div className="font-semibold">{firstName} {lastName}</div>
                  <div className="text-xs font-medium opacity-75">Age : {age}</div>
                  <div className="text-xs font-medium opacity-75">Gender : {gender}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => reviewRequest("accepted", _id)}
                    className="btn bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => reviewRequest("rejected", _id)}
                    className="btn bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    Reject
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    ) : (
      <h1 className="text-center text-white text-2xl p-6">No requests</h1>
    )}
  </div>
);

};

export default Request;
