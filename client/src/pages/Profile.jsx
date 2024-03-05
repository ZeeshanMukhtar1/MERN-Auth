import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Upload is done');
            break;
        }
      },
      (error) => {
        console.error(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
          setImagePercentage(100);
        });
      }
    );
  };

  return (
    <div className="container p-8 mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-7">Your Profile</h1>

      <div className="relative mb-5">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className="items-center object-cover w-20 h-20 border-2 border-gray-300 rounded-full cursor-pointer "
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile picture"
          onClick={() => fileRef.current.click()}
        />
        {imageError && (
          <span className="mt-2 text-red-500">
            Error uploading image to Firebase
          </span>
        )}
        {imagePercentage > 0 && imagePercentage < 100 && (
          <span className="mt-2 text-red-500">
            Image upload in progress... {imagePercentage}%
          </span>
        )}
        {imagePercentage === 100 && (
          <span className="mt-2 text-green-500">
            Image uploaded successfully
          </span>
        )}
      </div>

      <form className="flex flex-col items-center w-full max-w-md mx-auto">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="p-2 mb-3 border border-gray-300 rounded"
          value={currentUser.username}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="p-2 mb-3 border border-gray-300 rounded"
          value={currentUser.email}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-2 mb-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 mt-5 text-white bg-blue-500 rounded"
        >
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
