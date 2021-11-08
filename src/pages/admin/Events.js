import React, {useState, useEffect} from 'react';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { firestore, auth } from '../../config/firebase';
import { useAuth } from "../../config/context";
import { Link, useHistory } from "react-router-dom"

function Events() {

    const history = useHistory();
    const { currentUser } = useAuth();
    const [events, setEvents] = useState([]);

    function setDate(startDate) {
        var date = new Date(startDate);
        date.setDate(date.getDate() + 1);
        return date.toDateString();
    }

    useEffect(() => {
        if(currentUser) {
            auth.currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                if (!!idTokenResult.claims.admin) {
                    firestore.collection('events').get()
                    .then((querySnapshot) => {
                        var eventsArray = [];
                        querySnapshot.forEach((doc) => {
                            eventsArray.push({...doc.data(), id: doc.id})
                        });
                        setEvents(eventsArray)
                    })
                        .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
                } else {
                    history.push('/')
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            history.push('/')
        }
    },[])
  return (
    <>
        <AdminHeader />
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
                                        alt="Card image"
                                        src={event.headerimage}
                                        width="100%"
                                    />
                                    <CardBody>
                                    <CardTitle tag="h5">
                                        {event.name}
                                    </CardTitle>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                                        {event.game}
                                    </CardSubtitle>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                                        {setDate(event.start_date)}
                                    </CardSubtitle>
                                    <CardText>
                                        {event.eventoverview}
                                    </CardText>
                                    <Link to={'/admin/event/' + event.id}>
                                    <Button>
                                        VIEW
                                    </Button>
                                    </Link>
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

export default Events;
