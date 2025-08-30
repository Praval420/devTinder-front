import { useSelector } from "react-redux";
import EditProfile from "./editProfile";
import UserCard from "./userCard";
import { BASE_URL } from "../constants/const";
import axios from "axios";
const Profile=()=>{
    const info=useSelector((store)=>store.user);
    const editProfile= async (updated)=>{
        const {fname, lname,photoURL,skills,age,about,gender}=updated;
        await axios.post(BASE_URL+"/profile/edit",{
            firstName:fname,
            lastName:lname,
            photoURL,
            skills,
            age,
            about,
            gender,
        },{withCredentials:true});

    }
    return <>
    {info &&
    
        <EditProfile user={info} onSave={editProfile}/>
        
    
    }
    </>

}

export default Profile;