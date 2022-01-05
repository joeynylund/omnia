import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { firestore } from '../config/firebase';
import defaultLogo from '../assets/default-team-logo.png';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../config/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/Loading';

function Teams () {

    const history = useHistory();
    const { currentUser } = useAuth();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(currentUser === null) {
            history.replace('/login')
        } else {
            firestore.collection("teams")
            .where("members", "array-contains", currentUser.uid).get().then((querySnapshot) => {
                var userTeams = [];
                querySnapshot.forEach((doc) => {
                    userTeams.push({
                        id: doc.id,
                        name: doc.data().name,
                        logo: doc.data().logo,
                        members: doc.data().members,
                        captain: doc.data().captain
                    })
                });
                setTeams(userTeams)
                setLoading(false)
            });
        }
    }, [])

  return (
    <>
        <Header />
        <div style={{backgroundColor:'#000',padding:'20px',display:'flex',justifyContent:'center'}}><h1 style={{color:'#fff',fontWeight:'800',margin:'0'}}>ACCOUNT SETTINGS</h1></div>
        <div>
            <Container>
            {loading === true ? <Loading /> : teams && <div className='section'>
                <Form style={{width:'500px', maxWidth:'100%', marginTop:'20px'}}>
                    <FormGroup>
                        <Label style={{width:'100%',textAlign:'left'}}>Full Name</Label>
                        <Input type="text" id="firstName" style={{height:'50px'}}></Input>
                        <FormFeedback style={{width:'100%',textAlign:'left'}}></FormFeedback>
                    </FormGroup>
                    <FormGroup style={{marginTop:'10px'}}>
                        <Label style={{width:'100%',textAlign:'left'}}>Username</Label>
                        <Input type="text" id="firstName" style={{height:'50px'}}></Input>
                        <FormFeedback style={{width:'100%',textAlign:'left'}}></FormFeedback>
                    </FormGroup>
                    <FormGroup style={{marginTop:'10px'}}>
                        <Label style={{width:'100%',textAlign:'left'}}>Phone Number</Label>
                        <Input type="text" id="firstName" style={{height:'50px'}}></Input>
                        <FormFeedback style={{width:'100%',textAlign:'left'}}></FormFeedback>
                    </FormGroup>
                    <FormGroup style={{marginTop:'10px'}}>
                        <Label style={{width:'100%',textAlign:'left'}}>Account Email</Label>
                        <Input type="text" id="firstName" style={{height:'50px'}}></Input>
                        <FormFeedback style={{width:'100%',textAlign:'left'}}></FormFeedback>
                    </FormGroup>
                    <FormGroup style={{marginTop:'10px'}}>
                        <Label style={{width:'100%',textAlign:'left'}}>PayPal Email</Label>
                        <Input type="text" id="firstName" style={{height:'50px'}}></Input>
                        <FormFeedback style={{width:'100%',textAlign:'left'}}></FormFeedback>
                    </FormGroup>
                </Form>
                    <center>
                        <Link to={'/teams/create'}>
                            <Button style={{backgroundColor:'#121212',color:'#fff',padding:'10px 40px',marginTop:'20px',fontWeight:'800'}} size='lg'>SAVE CHANGES</Button>
                        </Link>
                    </center>
                </div>
            }
            </Container>
        </div>
        <Footer />
    </>
  );
}

export default Teams;
