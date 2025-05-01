import { useState, useEffect, useRef } from 'react';
import { apiBaseUrl } from "../config/config";

const VideoFeed = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (isStreaming) {
      videoElement.src = `${apiBaseUrl}/video_feed`;
    } else {
      videoElement.src = '';
    }

  }, [isStreaming]);

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="mt-6">
      <h2 className='text-xl font-semibold mb-5'>Realtime Video Feed</h2>
            <button
              onClick={toggleStream}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isStreaming ? 'Hide Video Feed' : 'Show Video Feed'}
            </button>
            
      <img
        ref={videoRef}
        style={{display: isStreaming ? 'block' : 'none',}}
        alt="Live Video Feed"
        className="w-full mt-5 max-w-2xl rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      />
    </div>
  );
};

export default VideoFeed;