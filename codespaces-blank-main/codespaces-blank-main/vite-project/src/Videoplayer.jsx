import React from "react";
import { useLocation } from 'react-router-dom';
import ApiComponent from "./ApiComponent";
import { useState } from "react";
import { Link } from "react-router-dom";
import tag from './Tag';
const Videoplayer = () => {
  const location = useLocation();
  const videoData = location.state;
  const [fetchedData,setFetchedData] = useState([]);

  // Destructure the videoData object
  const { title, image, duration, views, video, id } = videoData;

  // Define an inline style object for the iframe
  const iframeStyle = {
    marginTop: '8rem',
    width: "100%",  // Full width
    height: "70vh", // Full height
    border: "1px solid white", // Remove iframe border (optional)
  };
const onDataFetched = (data) => {
    setFetchedData(data);
    console.log(data)
  };

console.log(tag)

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
      
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <h2>{title}</h2>
      <p>Views: {views}</p>
      </div>
    <ApiComponent apiUrl={`https://lust.scathach.id/xhamster/search?key=${tag}&page=1`} onDataFetched={onDataFetched}/>
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
