import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const pageSize = 16;

  useEffect(() => {
    // Fetch random nxx videos using Axios
    fetch('https://lust.scathach.id/xhamster/search?key=milf&page=1')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setFetchedData(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array to fetch data once when the component mounts

  useEffect(() => {
    updateCurrentData();
  }, [fetchedData, currentPage]);

  const updateCurrentData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newData = fetchedData.slice(startIndex, endIndex);
    setCurrentData(newData);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(fetchedData.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {currentData.map((video) => (
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
      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(fetchedData.length / pageSize)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
