import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { firestore } from '../config/firebase';
import { Link, useHistory, useParams } from "react-router-dom"


function Event() {

    const history = useHistory()
    let { id } = useParams();
    const [event, setEvent] = useState({});
    const [activeTab, setActiveTab] = useState('1');

    function setDate(startDate) {
        var date = new Date(startDate);
        date.setDate(date.getDate() + 1);
        return date.toDateString();
    }

    useEffect(() => {

        firestore.collection('events').doc(id).get()
            .then((doc) => {
                if(doc.exists === true) {
                    firestore.collection('series').where('name','==',doc.data().seriesname).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {
                            setEvent({
                            ...doc.data(),
                            medalimage: doc2.data().medal
                        })
                        });
                    })
                } else {
                    alert('No event found')
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    },[])
  return (
    <>
        <Header />
        <div className='select-game'>
        <div className='event-banner' style={{width:'100%', height:'450px',backgroundColor:'#121212',backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', backgroundImage: `url(${event.headerimage})`}}></div>
            <Container style={{backgroundColor:'#fff'}}>    
                <div className='section'>
                    <Row style={{alignItems:'center'}}>
                        <Col lg='9'>
                            <h1 style={{fontWeight:'800',margin:'0'}}>{event.name}</h1>
                            <h3 style={{margin:'0'}}>{event.seriesname}</h3>
                            <h5 style={{margin:'0'}}>{'Game: ' + event.game}</h5>
                            <p>{setDate(event.start_date)}</p>
                        </Col>
                        <Col lg='3'>
                            <Link to={'/register/' + id}>
                                <Button style={{backgroundColor:'#242425',height:'50px',width:'100%'}} size="lg">REGISTER</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='8'>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                        Overview
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                        Rules & Instructions
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    {event.eventoverview}
                                </TabPane>
                                <TabPane tabId="2">
                                    {event.rulesinstructions}
                                </TabPane>
                            </TabContent>
                        </Col>
                        <Col lg='4'>
                            <h2 style={{fontWeight:'800'}}>Series Medal</h2>
                            <img src={event.medalimage} width='100%' />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
        <Footer />
    </>
  );
}

export default Event;
