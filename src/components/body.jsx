import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { BASE_URL } from "../constants/const";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const storeUser=useSelector((store)=>store.user);
    const startingFun = async () => {
  try {
    const user = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
    dispatch(addUser(user.data));
  } catch (err) {
    if(err.status==401){
        navigate("/login");

    }
    else{
        console.error(err);
    }
  }
};

    useEffect(()=>{
        if(!storeUser){
            startingFun();
        }
    },[]);
return <>
    <Navbar/>
    <Outlet/>
    <Footer/>
</>
}

export default Body;