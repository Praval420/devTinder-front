import axios from "axios";
import { BASE_URL } from "../constants/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { addConnections, removeConnections } from "../utils/connectionsSlice"; // your slice
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

  const fetchFeed = async () => {
  try {
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res.data));
  } catch (err) {
    console.error(err);
  }
};

  // Fetch connections and update Redux
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
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id)); // remove from requests list

      if (status === "accepted") {
        await fetchConnections(); // refresh connections on acceptance
      }
      await fetchFeed();
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
    <>
      {store && (
        <>
          <h1 className="fz-10 text-center text-4xl p-2">Requests</h1>
          <ul className="list bg-base-100 rounded-box shadow-md flex flex-col items-center w-full max-w-lg mx-auto p-4 mb-8">
            {store.map((z, index) => {
              const { _id, firstName, lastName, about, age, gender, photoURL } = z;
              return (
                <li
                  key={_id || index}
                  className="list-row w-full max-w-md mx-auto mb-4 flex items-center bg-indigo-700 gap-4 rounded-box p-4 shadow-sm"
                >
                  <div className="text-4xl font-thin opacity-50 text-white tabular-nums">{index + 1}</div>
                  <img className="size-10 rounded-box" src={photoURL} alt={`${firstName} ${lastName}`} />
                  <div className="flex-1">
                    <div>{firstName} {lastName}</div>
                    <div className="text-xs font-semibold opacity-70">Age : {age}</div>
                    <div className="text-xs font-semibold opacity-70">Gender : {gender}</div>
                  </div>
                  <div>
                    <button onClick={() => reviewRequest("accepted", _id)} className="btn btn-success mr-3">Accept</button>
                    <button onClick={() => reviewRequest("rejected", _id)} className="btn btn-error w-20">Reject</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Request;
