import React from "react";
import { useLocation } from 'react-router-dom';
import ApiComponent from "./ApiComponent";
import { useState } from "react";
import { Link } from "react-router-dom";
const Videoplayer = () => {
  const location = useLocation();
  const videoData = location.state;
  const [fetchedData, setFetchedData] = useState([]);

  // Destructure the videoData object
  const { title, image, duration, views, video, id } = videoData;

  // Define an inline style object for the iframe
  const iframeStyle = {
    width: "90vw",  // Full width
    height: "60vh", // Full height
    border: "none", // Remove iframe border (optional)
  };
const onDataFetched = (data) => {
    setFetchedData(data);
    console.log(data)
  };
const randomTag = () => {
  const a

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
    <ApiComponent apiUrl={`https://lust.scathach.id/xhamster/search?key=milf&page=2`} onDataFetched={onDataFetched}/>
    {fetchedData.map((video) => (
      <div key={video.id} className="video-container">
      <Link to='/player' state={video}>
        <img
        className='video-thumb'
          src={video.image}
          alt={video.title}
          width="640"
          height="360"
        />
      </Link>
      <p className="duration">{video.duration}</p>
      <div className='info'>
        <h2>{video.title}</h2>
        <h2>{video.views}</h2>
      </div>
    </div>
      ))}
    </div>
  );
}

export default Videoplayer;
