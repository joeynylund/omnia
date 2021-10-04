import React, { useState } from 'react';
import {
  Button,
  Container
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = (props) => {

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',width:'100%',padding:'40px 0px'}}>
        <FontAwesomeIcon icon={faTwitter} size='2x' style={{margin:'10px'}} />
        <FontAwesomeIcon icon={faInstagram} size='2x' style={{margin:'10px'}} />
      </div>
      <div style={{backgroundColor:'#000',padding:'40px 0px'}}>
        <Container className='copyright' style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
          <p style={{textAlign:'center',color:'#fff',margin:'0'}}>&copy; 2021 Omnia Competitive Culture LLC. All Rights Reserved</p>
          <p style={{textAlign:'center',color:'#fff',margin:'0'}}>Terms Of Service</p>
        </Container>
      </div>
    </>
  );
}

export default Footer;