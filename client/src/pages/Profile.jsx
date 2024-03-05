import React from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-semibold text-center mb-7">Your Profile</h1>

      <div className="relative mb-5">
        <input type="file" hidden ref={fileRef} accept="image/*" />
        <img
          className="object-cover w-20 h-20 rounded-full cursor-pointer"
          src={currentUser.profilePicture}
          alt="profile picture"
          onClick={() => fileRef.current.click()}
        />
      </div>

      <form className="flex flex-col items-center w-full max-w-md mx-auto">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="mb-3 input-field"
          value={currentUser.username}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="mb-3 input-field"
          value={currentUser.email}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="mb-3 input-field"
        />
        <button type="submit" className="w-full mt-5 btn-primary">
          Update
        </button>
      </form>

      <div className="flex flex-col items-center mt-8">
        <span className="mb-2 text-red-500 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-blue-500 cursor-pointer hover:underline">
          Logout
        </span>
      </div>
    </div>
  );
}

export default Profile;
