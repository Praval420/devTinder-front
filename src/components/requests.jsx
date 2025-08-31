import axios from "axios";
import { BASE_URL } from "../constants/const";

const Request=()=>{

    const handleRequest=async ()=>{
            const user=await axios(BASE_URL+"/user/requests/received",{withCredentials:true});

        }

    return <>
        
    </>
}

export default Request;