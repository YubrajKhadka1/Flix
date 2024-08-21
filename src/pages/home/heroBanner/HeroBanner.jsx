import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import ImgLazyLoad from "../../../components/lazyLoadImages/LazyLoadImages";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {url} = useSelector((state)=> state.home);

  const {data, loading} = useFetch("/movie/upcoming");

  // Get Background Poster by Original Size and Change Random
  useEffect(()=>{
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  // navigate to query Search Results
  const searchQueryHandler = (e)=>{
    if(e.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className='heroBanner'>
      
    <div className="backdrop-img">
      <ImgLazyLoad src={background}
      />
    </div>
    <div className="opacity-layer"></div>
    <ContentWrapper>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies, TV show and people to discover. Explore now.</span>
        </div>
        <div className="searchBar">
        <input type="text" 
              placeholder='Search a Movies or TV Show...' 
              onChange={(e)=> setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}/>
          <button onClick={(e)=> searchQueryHandler(e.target.value)}>Search</button>
        </div>
      </div>
    </ContentWrapper>
  </div>)
}
export default HeroBanner