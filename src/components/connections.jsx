import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/const";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const Connections = () => {
  const store = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const handleConnections = async () => {
    const users = await axios(BASE_URL + "/user/requests/connections", { withCredentials: true });
    dispatch(addConnections(users.data.data));
  };

  useEffect(() => {
    if (!store) {
      handleConnections();
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 to-blue-800 flex flex-col">
      {store && (
        <>
          <h1 className="fz-10 text-center text-4xl p-6 text-white">Connections</h1>
          <ul className="rounded-xl shadow-lg flex flex-col items-center w-full max-w-lg mx-auto p-4 mb-8 flex-grow overflow-auto">
            {store.map((z, index) => {
              const { firstName, lastName, about, age, gender, photoURL } = z;
              return (
                <li
                  key={index}
                  className="relative w-full max-w-md mx-auto mb-6 flex items-center bg-gradient-to-r from-indigo-700 to-blue-600 border-l-4 border-teal-300 gap-4 rounded-2xl p-5 shadow-lg"
                >
                  <div className="text-3xl font-bold text-white opacity-50 tabular-nums mr-3">{index + 1}</div>
                  <img className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" src={photoURL} alt={`${firstName} ${lastName}`} />
                  <div className="flex-1 text-white">
                    <div className="font-semibold">{firstName} {lastName}</div>
                    <div className="text-xs font-medium opacity-75">Age : {age}</div>
                    <div className="text-xs font-medium opacity-75">Gender : {gender}</div>
                  </div>
                  <div>
                    <Link to={"/chat/" + z._id}>
                      <button className="btn bg-gradient-to-r from-pink-500 to-pink-400 border-2 border-pink-700 text-white font-bold px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105">
                        Chat
                      </button>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Connections;
