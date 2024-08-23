import React, { useContext, useEffect, useState } from 'react';
import './profileupdate.css';
import assets from '../../assets/assets';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload'; // Import the upload function
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const  {setUserData} =useContext(AppContext)

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Upload Profile picture");
        return;
      }
      const docRef = doc(db, 'users', uid);
      if (image) {
        const imgUrl = await upload(image); // Use the imported upload function
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }
      const snap=await getDoc(docRef);
       setUserData(snap.data());
       navigate('/chating');
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    }
  } 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setBio(data.bio || "");
          setPrevImage(data.avatar || "");
        }
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor='avatar'>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden />
            <img src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon} alt="Profile" />
            Upload Profile Image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Your Name' required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write Profile Bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image) :prevImage ? prevImage : assets.logo_icon} alt="Profile Preview" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
