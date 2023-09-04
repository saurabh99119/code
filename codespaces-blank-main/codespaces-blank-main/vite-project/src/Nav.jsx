import React, { useState } from "react";

const Navigation = ({handleSearch}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  };

  const logoStyle = {
    maxWidth: "100px",
  };

  const categoriesStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  };

  const dropdownStyle = {
    position: "relative",
    display: "inline-block",
  };

  const dropbtnStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const dropdownContentStyle = {
    display: isDropdownOpen ? "block" : "none",
    position: "absolute",
    backgroundColor: "#333",
    minWidth: "160px",
    zIndex: 1,
  };

  const dropdownLinkStyle = {
    color: "white",
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
  };

  const searchContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const searchInputStyle = {
    padding: "5px 10px",
    border: "none",
    marginRight: "10px",
    borderBottom: "2px solid transparent",
    transition: "border-color 0.3s ease",
    outline: "none",
  };

  const searchButtonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "5px 15px",
    cursor: "pointer",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const handleChange = () => {
    if(searchTerm != ""){
        handleSearch(searchTerm)
    }
    }

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <img src="logo.png" alt="Logo" />
      </div>
      <div style={categoriesStyle}>
        <div style={dropdownStyle}>
          <button style={dropbtnStyle} onClick={toggleDropdown}>
            Categories
          </button>
          <div style={dropdownContentStyle}>
            <a style={dropdownLinkStyle} href="#">
              Category 1
            </a>
            <a style={dropdownLinkStyle} href="#">
              Category 2
            </a>
            <a style={dropdownLinkStyle} href="#">
              Category 3
            </a>
          </div>
        </div>
      </div>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search..."
          style={searchInputStyle}
          className="searchbar"
            value={searchTerm}
            onChange={(e)=> {
                setSearchTerm(e.target.value)
                e.target.value = ""
            }
            }
        />
        <button
        onClick={handleChange}
        style={searchButtonStyle}>Search</button>
      </div>
    </nav>
  );
};

export default Navigation;
