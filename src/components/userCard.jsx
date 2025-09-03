import axios from "axios";
import { BASE_URL } from "../constants/const";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard=({user})=>{

  const dispatch=useDispatch();
    const handleFeed= async(status,userid)=>{
      try{
      axios.post(BASE_URL+"/request/send/"+status+"/"+userid,{},{withCredentials:true});
      dispatch(removeFeed(user._id));
      }catch(err){
        
      }
    }

    return <>
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-purple via-pink-500 to-red p-2">
  <div className="bg-white rounded-xl mt-4 shadow-lg h-130  max-w-sm w-full overflow-hidden">
    <img
      className="w-full h-64 object-cover "
      src={user.photoURL}
      alt="Profile"
    />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.firstName} {user.lastName}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Gender: </span> Female
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Age: </span> 28
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Skills: </span> React, Node.js, Tailwind CSS
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">About: </span> React, Node.js, Tailwind CSS
      </p>
      <div className="flex justify-between">
        <button onClick={()=>{handleFeed("ignored",user._id)}} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Ignore
        </button>
        <button onClick={()=>{handleFeed("interested",user._id)}} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Interested
        </button>
      </div>
    </div>
  </div>
</div>

    </>
}

export default UserCard;