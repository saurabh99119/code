import React from "react";
import { useLocation } from 'react-router-dom';

const Videoplayer = () => {
  const location = useLocation();
  const videoData = location.state;

  // Destructure the videoData object
  const { title, image, duration, views, video } = videoData;

  // Define an inline style object for the iframe
  const iframeStyle = {
    width: "90vw",  // Full width
    height: "60vh", // Full height
    border: "none", // Remove iframe border (optional)
  };

  return (
    <div>
      {/* Fullscreen iframe with inline style */}
      <iframe
        src={video}
        title={title}
        allowFullScreen
        frameBorder="0"
        style={iframeStyle} // Apply inline style
      ></iframe>
      
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:'0'}}>
      <h2>{title}</h2>
      <p>Views: {views}</p>
      </div>
    </div>
  );
}

export default Videoplayer;
