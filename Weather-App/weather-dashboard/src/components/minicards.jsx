import React from 'react';

const minicards = ({item}) => {
  return (
    <div className='minicards'>
    <p className='text-center'>
      {new Date(item.dt_txt.split(" ")[0]).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}
    </p>
    <hr />
    <p>{item.weather[0].description}</p>
    <p className='text-center font-bold'>{Math.round(item.main.temp)}°C</p>
  </div>
  )
}

export default minicards