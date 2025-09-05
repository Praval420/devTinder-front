import axios from "axios";
import {BASE_URL}  from "../constants/const";


function Premium() {

  const handleClick= async (plan )=>{
    const store=await axios.post(BASE_URL+"/payment/create",{
      membershipType:plan,
    },{withCredentials:true});

    const {amount,currency,notes,orderId,keyId}=store.data;

    const options={
      key:keyId,
      amount:amount,
      currency,
      name: "DevTinder",
      description: `${plan} Membership`,
      orderId,
      prefill: {
        "name":notes.firstName+ " "+notes.lastName,
        "email":notes.emailId,
        "contact":"34343894394",

    },
    theme: {
      color:"#F37254   "
    }
  };
    const rzp=new window.Razorpay(options);
  rzp.open();
  }

  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Buy Premium - DevTinder</h1>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Silver Plan */}
        <div className="bg-gray-400 border-4 border-gray-700 rounded-lg shadow p-8 flex flex-col items-center text-white">
          <h2 className="text-3xl font-semibold mb-6">Silver Plan</h2>
          <p className="text-4xl font-bold mb-6">$9.99 / month</p>
          <ul className="mb-8 space-y-3 text-center text-gray-300">
            <li>Unlimited Likes</li>
            <li>Profile Boost 1x/month</li>
            <li>View Who Likes You</li>
            <li>Ad-Free Experience</li>
          </ul>
          <button onClick={()=>{handleClick("silver")}} className="px-8 py-3 bg-gray-900 hover:bg-gray-800 rounded font-semibold transition">
            Buy Silver
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-yellow-100 rounded-lg shadow p-8 flex flex-col items-center border-4 border-yellow-400">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Gold Plan</h2>
          <p className="text-4xl font-bold mb-6 text-gray-900">$19.99 / month</p>
          <ul className="mb-8 space-y-3 text-center text-gray-700">
            <li>All Silver Features</li>
            <li>Profile Boost 5x/month</li>
            <li>See Top Picks</li>
            <li>Message Before Match</li>
          </ul>
          <button onClick={()=>{handleClick("gold")}} className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 rounded font-semibold text-white transition">
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
