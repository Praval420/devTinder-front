import axios from "axios";
import { BASE_URL } from "../constants/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request=()=>{
    const store=useSelector((store)=>store.request);
    const dispatch=useDispatch();
    const handleRequest=async ()=>{
            const user=await axios(BASE_URL+"/user/requests/received",{withCredentials:true});
            dispatch(addRequest(user.data.data));
        }

        useEffect(()=>{
            if(!store){
                handleRequest();
            }
        },[]);
    return <>
         {store && (
        <>
          <h1 className="fz-10 text-center text-4xl p-2">Requests</h1>
          <ul className="list bg-base-100 rounded-box shadow-md flex flex-col items-center w-full max-w-lg mx-auto p-4 mb-8">
            {store.map((z, index) => {
              const { firstName, lastName, about, age, gender, photoURL } = z.fromUserId;
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
                  <div>
                    <button className="btn btn-success mr-3">Accept</button>
<button className="btn btn-error w-20">Reject</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
}

export default Request;