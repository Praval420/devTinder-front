const UserCard=({user})=>{
    return <>
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-purple via-pink-500 to-red p-6">
  <div className="bg-white rounded-xl shadow-lg  mt-5 max-w-sm w-full overflow-hidden">
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
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Ignore
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Interested
        </button>
      </div>
    </div>
  </div>
</div>

    </>
}

export default UserCard;