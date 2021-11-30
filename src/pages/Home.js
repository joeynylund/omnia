import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row } from 'reactstrap';
import banner from '../assets/omnia-banner.png';
import apex from '../assets/apex.jpg';
import valorant from '../assets/valorant.jpg';
import { useHistory } from 'react-router-dom'; 

function Home() {

    const history = useHistory();

  return (
    <>
        <Header />
        <div style={{backgroundColor:'#000',padding:'20px',display:'flex',justifyContent:'center'}}><img src={banner} width='200' alt='Omnia Competitive Culture Banner' /></div>
        <div className='select-game'>
            <Container>
                <div className='section'>
                    <Row>
                        <h3 style={{fontWeight:'800'}}>Find an Event</h3>
                    </Row>
                    <Row>
                        <h4 style={{textAlign:'center',fontWeight:'800'}}>Select A Game...</h4>
                    </Row>
                    <Row style={{display:'flex',justifyContent:'center'}}>
                        <img src={valorant} className='game-cover' alt='Valorant Cover Art' onClick={() => history.replace('/events/Valorant')} />
                        <img src={apex} className='game-cover' alt='Apex Legends Cover Art' onClick={() => history.replace('/events/Apex Legends')} />
                    </Row>
                </div>
            </Container>
        </div>
        <div style={{backgroundColor:'#000'}}>
            <Container>
                <div className='section'>
                    <Row>
                        <h3 style={{fontWeight:'800',color:'#FFF'}}>Featured Event</h3>
                    </Row>

                </div>
            </Container>
        </div>
        <Footer />
    </>
  );
}

export default Home;
