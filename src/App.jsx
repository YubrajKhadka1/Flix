
import './App.css'
import {fetchDataFromApi} from './utils/api';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResults from './pages/searchResults/SearchResults';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  const {url} = useSelector((state)=> state.home);
  const dispatch = useDispatch();

  useEffect(()=>{
    fetchDataConfig(url)
    genresCall()
  },[]);

  const fetchDataConfig = ()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async(url)=>{
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id] = item))
    });
    dispatch(getGenres(allGenres))
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/:mediaType/:id'} element={<Details/>}/>
        <Route path={'/search/:query'} element={<SearchResults/>}/>
        <Route path={'/explore/:mediaType'} element={<Explore/>} />
        <Route path={'*'} element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
