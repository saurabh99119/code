import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import ApiComponent from './ApiComponent';
import Nav from './Nav';

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingOption, setSortingOption] = useState("views"); // Initialize sorting option to "views"
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const pageSize = 16;

  useEffect(() => {
    // Fetch random nxx videos using Axios
  }, []); // Empty dependency array to fetch data once when the component mounts

  useEffect(() => {
    updateCurrentData();
  }, [fetchedData, currentPage, sortingOption]); // Add sortingOption as a dependency

  const updateCurrentData = () => {
    let sortedData = [...fetchedData];

    // Sort the data based on the sorting option
    if (sortingOption === "views") {
      sortedData.sort((a, b) => compareViews(b.views, a.views)); // Reverse order (high to low)
    } else if (sortingOption === "default") {
      // Restore the original order
      sortedData = [...originalData];
    } // Add more sorting options as needed

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newData = sortedData.slice(startIndex, endIndex);
    setCurrentData(newData);
  };

  // Helper function to compare views for sorting
  const compareViews = (a, b) => {
    const viewsA = parseViews(a);
    const viewsB = parseViews(b);
    return viewsA - viewsB;
  };

  // Helper function to parse views (e.g., "26.7M views" => 26700000)
  const parseViews = (views) => {
    const multiplier = views.includes("M") ? 1000000 : views.includes("K") ? 1000 : 1;
    return parseFloat(views) * multiplier;
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

  const onDataFetched = (data) => {
    setOriginalData(data); // Store the original data
    setFetchedData(data);
  };

  const handleSearch = (term) => {
    const searchUrl = `https://lust.scathach.id/Xhamster/search?key=${term}&page=1`;
    setSearchTerm(searchUrl);
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  useEffect(() => {
    // Set the default sorting option to "views" when the component mounts
    setSortingOption("views");
  }, []);

  return (
    <>
      <Nav handleSearch={handleSearch} />
      <div>
        <div className="sorting-dropdown">
          <label>Sort by:</label>
          <select onChange={handleSortingChange} value={sortingOption}>
            <option value="views">Views</option>
            <option value="default">Default</option> {/* Added "Default" sorting option */}
            {/* Add more sorting options here */}
          </select>
        </div>
        <ApiComponent apiUrl={searchTerm ? searchTerm : "https://lust.scathach.id/xhamster/search?key=milf&page=1&sort=tr"} onDataFetched={onDataFetched} />
        {currentData.map((video) => (
          <div key={video.id} className="video-container">
            <Link to="/player" state={video}>
              <img
                className="video-thumb"
                src={video.image}
                alt={video.title}
                width="640"
                height="360"
              />
            </Link>
            <p className="duration">{video.duration}</p>
            <div className="info">
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
    </>
  );
}

export default App;
