import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../constants/const";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed=()=>{
    const dispatch=useDispatch();
    const choose=useSelector((store)=>store.feed);

    const getUsers= async ()=>{
        try{
        const users=await axios.get(BASE_URL+"/feed",{withCredentials:true});
        dispatch(addFeed(users.data));
        }catch(err){
            //to do
        }
    }
    // console.log(choose);

    useEffect(()=>{
        if(!choose){
            getUsers();
        }
    })
return <>
  {Array.isArray(choose) && choose.length > 0 && (
      <UserCard user={choose[0]}/>
    )}
</>
}

export default Feed;