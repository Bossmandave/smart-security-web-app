import { apiBaseUrl } from "../config/config";

const VideoFeed = () => {
  return (
    <div className="mt-6">
      <img
        src={`${apiBaseUrl}/video_feed`}
        alt="Live Video Feed"
        className="w-full max-w-2xl rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      />
    </div>
  );
};

export default VideoFeed;