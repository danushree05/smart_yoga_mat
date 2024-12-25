import React, { useState } from "react";
import { useParams } from "react-router-dom";

const videosData = {
  Beginner: [
    {
      id: 1,
      title: "Yoga for Beginners - 15 Minute Routine",
      url: "https://www.youtube.com/watch?v=1xRX1MuoImw",
    },
    {
      id: 2,
      title: "Beginner Yoga Poses",
      url: "https://www.youtube.com/embed/VIDEO_ID_2",
    },
  ],
  Medium: [
    {
      id: 1,
      title: "Intermediate Yoga Flow",
      url: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
    {
      id: 2,
      title: "Yoga for Flexibility",
      url: "https://www.youtube.com/embed/VIDEO_ID_4",
    },
  ],
  Hard: [
    {
      id: 1,
      title: "Advanced Yoga Practice",
      url: "https://www.youtube.com/embed/VIDEO_ID_5",
    },
    {
      id: 2,
      title: "Power Yoga Session",
      url: "https://www.youtube.com/embed/VIDEO_ID_6",
    },
  ],
};

const Beginner = () => {
  const { level } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);

  console.log("Level parameter:", level); // Check the level parameter

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-6">{level} Yoga Tutorials</h2>
      {selectedVideo ? (
        <div className="flex flex-col items-center">
          <iframe
            width="560"
            height="315"
            src={selectedVideo}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            onClick={() => setSelectedVideo(null)}
            className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Back to List
          </button>
        </div>
      ) : (
        <ul>
          {videosData[level]?.map((video) => (
            <li key={video.id} className="mb-4">
              <button
                onClick={() => handleVideoSelect(video.url)}
                className="text-blue-500 hover:underline"
              >
                {video.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Beginner;
