import React from 'react';

import { useState, useEffect } from "react";
import axios from 'axios';

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const UpComing = () => {
  const [nextMov,setNextMov] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getMovies = async()=>{
    try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=546c72b99cf64514c2c03c7ef473011b&language=ko`);
      setNextMov(response.data.results);
      // setAppMov(response.data.results.slice(0, 8));
      console.log("UpComing.jsx==", response);                                                                                                                                                                          
      setIsLoading(false);
    } catch(err){
      console.log("Error:", err)
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getMovies();
  }, [])

  return (
    <>
      {/* main - UpComing section */}
      <div className="movComing">
        <div className="layout-fix">
          {/* <ul className="coming-list">
            { isLoading ? (<p className="loding">로딩중</p>) : (
              <>
                {nextMov.map((el,idx) => (
                  <li key={idx}>
                    <Link to={`coming/${el.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={`${el.title}`}/>
                      <div className="tit">{el.title}</div>
                      <div className="tit-en">{el.original_title}</div>
                      <div className="vote">★ {el.vote_average.toFixed(1)}</div>
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul> */}

          { isLoading ? (<p className="loding">로딩중</p>) : (
            <>
              <h2>개봉 예정작</h2>
              <Swiper className="coming-list"
                  modules={[Navigation, Pagination]}
                  slidesPerView={3}
                  spaceBetween={20} 
                  grabCursor={true}
                  navigation={true}
                  pagination={{ clickable: true }}>
                    {nextMov.map((el,idx) => (
                      <SwiperSlide key={idx}>
                        <Link to={`coming/${el.id}`}>
                          <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={`${el.title}`}/>
                          <div className="tit">{el.title}</div>
                          <div className="tit-en">{el.original_title}</div>
                        </Link>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </>
          )}



        </div>
      </div>
    </>
  );
};

export default UpComing;