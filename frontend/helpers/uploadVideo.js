const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/video/upload`;

const uploadVideo = async (video) => {
  const formData = new FormData();
  formData.append("file", video);
  formData.append("upload_preset", "yoga_video"); // Change this to your video upload preset

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });

  return dataResponse.json();
};

export default uploadVideo;
