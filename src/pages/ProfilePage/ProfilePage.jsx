import { auth, db } from "../../common/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import VideoFeed from '../../components/VideoFeed.jsx';
import ThemeToggle from '../../components/ThemeToggle.jsx';
import FaceRecognitionButton from '../../components/FaceRecognitionButton.jsx';
import DoorControl from '../../components/DoorControl.jsx';
import PulseLoader from "react-spinners/PulseLoader";
import { IconCircleUser } from "../../assets/icons/icons.jsx";
import AlarmControl from "../../components/AlarmControl.jsx";
import EnrollFace from "../../components/EnrollFace.jsx"
import UserManagement from "../../components/UserManagement.jsx";
import AccessLogs from "../../components/AccessLogs.jsx";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [theme, setTheme] = useState('light');
  const [show, setShow] = useState(false); // state to show who is signed in
  const [showVideo, setShowVideo] = useState(false);
  const [refreshLogs, setRefreshLogs] = useState(false);

  // Load theme from local storage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is not logged In");
        }
      });
    };
    fetchUserData();
  }, []);

  // Save theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const handleRecognitionAttempt = () => {
    // This will trigger a log refresh in the AccessLogs component
    setRefreshLogs((prev) => !prev);
  };


  return (
    <div>
      {userDetails ? (
      <>
      <div className="bg-slate-100 border-b-2 sm:px-12 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="sm:text-[20px] text-lg font-medium">
            <span className="sm:text-[25px] text-xl font-bold">Welcome </span>
            {userDetails.fullName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {show ? (
            <div className="bg-blue-500 text-white px-5 py-2 rounded-md">
              <p>Signed in as {userDetails.email}</p>
            </div>
          ) : null}
          <div
            className="text-[40px] cursor-pointer flex items-center justify-center"
            onClick={() => {
              setShow((prev) => !prev);
            }}
          >
            <IconCircleUser/>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
        
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="sm:text-3xl text-2xl font-bold">Remote Security System</h1>
          
        </header>
        <main className="p-6 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 justify-between">
              <FaceRecognitionButton onAttempt={handleRecognitionAttempt} />
              <EnrollFace/>
            </div>
            
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 justify-between">
              <DoorControl />
              <AlarmControl/>
            </div>
            
            <h2 className='text-xl font-semibold'>Realtime Video Feed</h2>
            <button
              onClick={toggleVideo}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {showVideo ? 'Hide Video Feed' : 'Show Video Feed'}
            </button>
            {showVideo && <VideoFeed />}
            
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 justify-between">
              <UserManagement/>
              <AccessLogs onAttempt={refreshLogs}/>
            </div>
          </div>
        </main>
      </div>
      </>
      ): (
        <div className="h-[90vh] flex items-center justify-center">
          <PulseLoader
          color= {"#78b7ef"}
          loading={true}
          size={35}
          />
        </div>  
    )}
    </div>
  );
}

export default ProfilePage;