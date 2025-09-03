import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/const";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");



  const handleSignup = async (e) => {
    e.preventDefault(); // prevent form reload
    try {
      const user = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(user.data.data));
   
      navigate("/profile"); // navigate on success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-15">
      <form
        className="flex flex-col gap-2.5 max-w-[350px] p-5 rounded-2xl relative bg-[#1a1a1a] text-white border border-[#333] font-sans"
        onSubmit={handleSignup}
      >
        <p className="text-2xl font-semibold tracking-tight flex items-center pl-7 text-[#00bfff] relative">
          Register
          <span className="absolute left-0 w-4 h-4 rounded-full bg-[#00bfff] before:absolute before:content-[''] before:w-4 before:h-4 before:rounded-full before:left-0 before:bg-[#00bfff] before:animate-pulse"></span>
        </p>

        <p className="text-sm text-white/70">Signup now and get full access to our app.</p>

        <div className="flex gap-1.5 w-full">
          <label className="relative flex-1">
            <input
              type="text"
              required
              className="bg-[#333] text-white w-full px-2.5 pt-5 pb-1.5 outline-none border border-gray-500 rounded-lg peer"
              placeholder=" "
              value={firstName}
              onChange={(e) => setFname(e.target.value)}
            />
            <span className="absolute left-2.5 top-0 text-white/50 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#00bfff] peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#00bfff]">
              Firstname
            </span>
          </label>
          <label className="relative flex-1">
            <input
              type="text"
              required
              className="bg-[#333] text-white w-full px-2.5 pt-5 pb-1.5 outline-none border border-gray-500 rounded-lg peer"
              placeholder=" "
              value={lastName}
              onChange={(e) => setLname(e.target.value)}
            />
            <span className="absolute left-2.5 top-0 text-white/50 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#00bfff] peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#00bfff]">
              Lastname
            </span>
          </label>
        </div>

        <label className="relative">
          <input
            type="email"
            required
            className="bg-[#333] text-white w-full px-2.5 pt-5 pb-1.5 outline-none border border-gray-500 rounded-lg peer"
            placeholder=" "
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <span className="absolute left-2.5 top-0 text-white/50 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#00bfff] peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#00bfff]">
            Email
          </span>
        </label>

        <label className="relative">
          <input
            type="password"
            required
            className="bg-[#333] text-white w-full px-2.5 pt-5 pb-1.5 outline-none border border-gray-500 rounded-lg peer"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute left-2.5 top-0 text-white/50 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#00bfff] peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#00bfff]">
            Password
          </span>
        </label>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-[#00bfff] py-2 text-white text-base font-medium transition-colors hover:bg-[#00bfff96] outline-none"
        >
          Submit
        </button>

        <p className="text-sm text-white/70 text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00bfff] hover:underline hover:underline-offset-2">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
