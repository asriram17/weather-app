import React from 'react';

const Forecast = ({data}) => {
    const forecastItems = data.list
    .filter((_, index) => index>1 && index % 8 === 0);

  return (
    <div className='forecast-container'>
    {forecastItems.map((item,index) => (
            <div className='minicards' key={index}>
            <p className='text-center'>
              {new Date(item.dt_txt.split(" ")[0]).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}
            </p>
            <hr/>
            <p>{item.weather[0].description}</p>
            <p className='text-center font-bold'>{Math.round(item.main.temp)}°C</p>
          </div>
    ) )}
    </div>
  )

}

export default Forecast