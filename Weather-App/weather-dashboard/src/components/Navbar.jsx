import React from 'react';

import accountIcon from '../assets/account1.png';
import Home from '../assets/home.png';
import chat from '../assets/chat.png';
import settings from '../assets/settings.png';
import star from '../assets/star.jfif';
import hamburger from '../assets/hamburger.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><a href="#"> <img src={accountIcon}></img></a></li>
        <li><a href="#"> <img src={Home}></img></a></li>
        <li><a href="#"> <img src={chat}></img></a></li>
        <li><a href="#"> <img src={settings}></img></a></li>
        <li><a href="#"> <img src={star}></img></a></li>
        <li><a href="#"> <img src={hamburger}></img></a></li>
  
      </ul>
    </div>
  )
}

export default Navbar