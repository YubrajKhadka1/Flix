import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/FLIX-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const controlNavbar = ()=>{
      if(window.scrollY > 200) {
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide")
        }else{
          setShow("show")
        }
      }else{
        setShow("top")
      }
      setLastScrollY(window.scrollY)
    }

    useEffect(()=>{
      window.addEventListener("scroll", controlNavbar);
      return ()=> {
        window.removeEventListener("scroll", controlNavbar);
      }
    }, [lastScrollY])

    const searchQueryHandler = (e)=>{
      if(e.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
        setTimeout(() => {
          setShowSearch(false)
        }, 300);
      }
    }
    const navigationHandler = (type)=>{
      if(type === "movie"){
        navigate('explore/movie')
      }else{
        navigate('explore/tv')
      }
      setMobileMenu(false)
    }

    const openSearch = ()=>{
      setShowSearch(true);
      setMobileMenu(false)
    }
    const openMobileMenu = ()=>{
      setShowSearch(false);
      setMobileMenu(true);
    }
    return (
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
          <div className="logo">
            <img src={logo} alt="" onClick={() =>navigate("/")} />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={()=> navigationHandler("movie")}>Movies</li>
            <li className="menuItem" onClick={()=> navigationHandler("tv")}>TV Shows</li>
            <li className="menuItem">
              <HiOutlineSearch onClick={()=> openSearch()}/>
            </li>
          </ul>

          <div className="mobileMenuItems"> 
            <HiOutlineSearch onClick={()=> openSearch()}/>
            {
              mobileMenu 
              ? (<VscChromeClose onClick={()=>setMobileMenu(false)}/>) 
              : (<SlMenu onClick={openMobileMenu}/>)
            }
          </div>
        </ContentWrapper>
        {showSearch && (<div className="searchMobile">
          <ContentWrapper>
            <div className="searchBar">
              <input type="text" 
                placeholder='Search a Movies or TV Show...' 
                onChange={(e)=> setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}/>
              <VscChromeClose fill="black" onClick={()=>setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>)}
      </header>
    );
};

export default Header;
