import { useState } from "react";

const EditProfile = ({user,onSave})=>{
    const [fname,setFname]=useState(user.firstName);
    const [lname,setLname]=useState(user.lastName);
    const [photoURL,setPhotoURL]=useState(user.photoURL);
    const [skills,setSkill]=useState(user.skills);
    const [age,setAge]=useState(user.age);
    const [about,setAbout]=useState(user.about);
    const [gender,setGender]=useState(user.gender); 
    const [show,setMessage]=useState(false);

     const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ fname, lname,photoURL,skills,age,about,gender });
    setMessage(true);
    setTimeout(()=>{
        setMessage(false);
    },1000);
  };

    return <>
    {show && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Successfully.</span>
  </div>
</div>
}
    <div className="flex justify-center">
        <div>
    <form onSubmit={handleSubmit} className="w-100 mx-auto mt-1 bg-white pl-1 pr-1 rounded-lg shadow space-y-4 mb-4">
  <h2 className="text-xl font-bold text-gray-800 mt- text-center">Edit Profile</h2>
  <div>
    <label className="block text-gray-700 font-medium mb-1 text-sm">First Name</label>
    <input
  type="text"
  className="w-full border border-gray-300 rounded  text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
  placeholder="First Name"
  value={fname}
  onChange={(e)=>(setFname(e.target.value))}
/>
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-1 text-sm">Last Name</label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Last Name"
      value={lname}
      onChange={(e)=>(setLname(e.target.value))}
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium  text-sm">Gender</label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded p-1 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Last Name"
      value={gender}
      onChange={(e)=>(setGender(e.target.value))}
    />
  </div>
  
  <div>
    <label className="block text-gray-700 font-medium text-sm">Photo URL</label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded p-1  text-black text-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Photo URL"
      value={photoURL}
      onChange={(e)=>(setPhotoURL(e.target.value))}
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium text-sm">Age</label>
    <input
      type="number"
      className="w-full border border-gray-300 rounded  text-black p-1 text-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Age"
      min="0"
      value={age}
      onChange={(e)=>(setAge(e.target.value))}
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium text-sm">Skills</label>
    <input
      type="text"
      className="w-full border border-gray-300  text-black rounded p-1 text-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="e.g. React, Node.js"
      value={skills}
      onChange={(e)=>(setSkill(e.target.value))}
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium text-sm">About</label>
    <textarea
      className="w-full border border-gray-300 rounded p-1  text-black text-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Tell us about yourself..."
      rows="2"
      value={about}
      onChange={(e)=>(setAbout(e.target.value))}
    />
  </div>
  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 rounded transition text-sm">Save Profile</button>
</form>

</div>
<div>
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-purple via-pink-500 to-red p-1 ">
  <div className="bg-white rounded-xl shadow-lg h-140 ml-4 max-w-sm w-full overflow-hidden">
    <img
      className="w-full h-64 object-cover "
      src={user.photoURL}
      alt="Profile"
    />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{fname} {lname}</h2>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Gender: </span> {gender}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Age: </span> {age}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Skills: </span> {skills}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">About: </span> {about }
      </p>
     
    </div>
  </div>
</div>
</div>
</div>
    </>
}

export default EditProfile;
