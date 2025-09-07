import { BASE_URL } from "../constants/const";
import io from "socket.io-client";

export const createSocketConnection=()=>{
    if(location.hostname==="localhost"){
        return io(BASE_URL);
    }
    else{
        io("/",{path:"/api/socket.io"});
    }
};