import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/const";
import { addConnections } from "../utils/connectionsSlice";
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
    if(!store){
        handleConnections();
    }
      
  }, );

  return (
    <>
      {store && (
        <>
          <h1 className="fz-10 text-center text-4xl p-2">Connections</h1>
          <ul className="list bg-base-100 rounded-box shadow-md flex flex-col items-center w-full max-w-lg mx-auto p-4 mb-8">
            {store.map((z, index) => {
              const { firstName, lastName, about, age, gender, photoURL } = z;
              return (
                <li
                  key={index}
                  className="list-row w-full max-w-md mx-auto mb-4 flex items-center bg-indigo-700 gap-4 rounded-box p-4 shadow-sm"
                >
                  <div className="text-4xl font-thin opacity-50 text-white tabular-nums">{index + 1}</div>
                  <img className="size-10 rounded-box" src={photoURL} alt={`${firstName} ${lastName}`} />
                  <div className="flex-1">
                    <div>{firstName} {lastName}</div>
                    <div className="text-xs  font-semibold opacity-70">Age : {age}</div>
                    <div className="text-xs  font-semibold opacity-70">Gender : {gender}</div>
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

export default Connections;
