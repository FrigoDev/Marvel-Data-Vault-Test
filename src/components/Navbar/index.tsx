import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MarvelLogo from "../../assets/img/MarvelLogo.png";
import "./Navbar.css";
import { PageRoutes } from "../../constants/PageRoutes";

import BurguerButton from "./BurguerButton";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const navigate = useNavigate();

  return (
    <header className="web-header">
      <div className="navbar">
        <div className="logo-container">
          <img className="logo" src={MarvelLogo} alt="Marvel Logo" />
        </div>
        <div className={`links ${clicked ? "active" : ""}`}>
          <a
            className="link"
            onClick={() => {
              navigate(PageRoutes.HOME);
            }}
          >
            Home
          </a>
          <a
            className="link"
            onClick={() => {
              navigate(PageRoutes.CHARACTERS);
            }}
          >
            Characters
          </a>
          <a
            className="link"
            onClick={() => {
              navigate(PageRoutes.COMICS);
            }}
          >
            Comics
          </a>
          <a
            className="link"
            onClick={() => {
              navigate(PageRoutes.STORIES);
            }}
          >
            Stories
          </a>
          <a
            className="link"
            onClick={() => {
              navigate(PageRoutes.BOOKMARKS);
            }}
          >
            Bookmarks
          </a>
        </div>
        <div className="burguer">
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <div className={`bg-cover initial ${clicked ? " active" : ""}`}></div>
      </div>
    </header>
  );
};
export default Navbar;
