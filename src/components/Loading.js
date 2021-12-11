import React from 'react';
import logo from '../assets/omnia.png';

const Loading = () => {

  return (
        <div style={{display:'flex',justifyContent:'center',padding:'5% 0%'}}>
            <img src={logo} className="loader" style={{width:'200px'}} />
        </div>
  );
}

export default Loading;