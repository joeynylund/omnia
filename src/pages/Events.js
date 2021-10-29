import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import banner from '../assets/omnia-banner.png';
import apex from '../assets/apex.jpg';
import valorant from '../assets/valorant.jpg';
import { firestore } from '../config/firebase';

function Home() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        firestore.collection('events').get()
            .then((querySnapshot) => {
                var eventsArray = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    eventsArray.push(doc.data())
                });
                setEvents(eventsArray)
            })
                .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    },[])
  return (
    <>
        <Header />
        <div style={{backgroundColor:'#000',padding:'20px',display:'flex',justifyContent:'center'}}><img src={banner} width='200' alt='Omnia Competitive Culture Banner' /></div>
        <div className='select-game'>
            <Container>
                <div className='section'>
                    <Row>
                        <h3 style={{fontWeight:'800'}}>Events</h3>
                    </Row>
                    <Row>
                        {events.map((event) => (
                            <Col md='3'>
                                <Card>
                                    <CardImg
                                        alt="Card image cap"
                                        src={event.headerimage}
                                        top
                                        width="100%"
                                    />
                                    <CardBody>
                                    <CardTitle tag="h5">
                                        {event.name}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        {event.start_date}
                                    </CardSubtitle>
                                    <CardText>
                                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                    </CardText>
                                    <Button>
                                        Button
                                    </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
        <Footer />
    </>
  );
}

export default Home;
