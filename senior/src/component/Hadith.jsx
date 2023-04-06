import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3005/ramadhan/Hadith')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    else {
      setActiveIndex(data.length -1)
    }
  };

  const handleNext = () => {
    if (activeIndex < data.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
 
  return (
    <div className='container bg-Light'>
  <div className='d-flex justify-content-center align-items-center vh-100'>
        <div id="carousel carousel dark Light" className="carousel " data-bs-touch="false">
          <div className="carousel-inner">
            {data.map((item, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active ' : ''}`}>
                <span class="tab-pane ">{item.hadith}</span>
                <p className='text-center'>{item.narrator}</p>
                <p className='text-center'>{item.book}</p>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-dark" type="button" onClick={handlePrev}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
        
            <button className="btn btn-dark" type="button" onClick={handleNext}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent

