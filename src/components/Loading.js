import React from 'react';
import logo from '../assets/omnia.png';

const Loading = () => {

  return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <img src={logo} className="loader" style={{width:'200px'}} />
        </div>
  );
}

export default Loading;