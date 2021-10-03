import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { firebase, firestore } from '../config/firebase';
import { Container, Row, Col, Form, FormFeedback, FormGroup, Input, Button, Label } from 'reactstrap';
import banner from '../assets/omnia_full_dark.png';
import { useAuth } from "../config/context"
import { Link, useHistory } from "react-router-dom"

function Login() {
    const history = useHistory()
    const db = firestore.collection('games');
    const [games, setGames] = useState([]);
    const [credentials, setCredentials] = useState({});
    const { currentUser, signup } = useAuth()
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [step, setStep] = useState(0);

    const handleChange = (e) => {
        const {id, value} = e.target
        setCredentials(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const step1 = async (e) => {
        e.preventDefault();
        setStep(step + 1);
    }

    const handleSubmit = e => {
        
    }

    function getGames() {
        db.get()
        .then((querySnapshot) => {
            var supportedGames = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                supportedGames.push(doc.data())
            });
            setGames(supportedGames)
            console.log(supportedGames)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    useEffect(() => {
        getGames();
      }, [])
  return (
    <>
        <Header />
            <div className='select-game' style={{minHeight:'100vh'}}>
                <Container>
                    <div style={{padding:'15% 0px'}}>
                        <center>
                        <h2 style={{fontWeight:'900'}}>Athlete Profile {step}</h2>
                        <Form style={{width:'500px', maxWidth:'100%', marginTop:'20px'}} onSubmit={step1}>
                            <FormGroup>
                                <Input type="text" id="firstName" onChange={handleChange} placeholder="First Name" style={{height:'50px'}}></Input>
                            </FormGroup>
                            <FormGroup style={{marginTop:'10px'}}>
                                <Input type="text" id="lastName" onChange={handleChange} placeholder="Last Name" style={{height:'50px'}}></Input>
                            </FormGroup>
                            <FormGroup style={{marginTop:'10px'}}>
                                <Input type="email" id="email" onChange={handleChange} placeholder="Email Address" style={{height:'50px'}}></Input>
                            </FormGroup>
                            <FormGroup style={{marginTop:'10px'}}>
                                <Input type="password" id="password" onChange={handleChange} placeholder="Password" style={{height:'50px'}}></Input>
                            </FormGroup>
                            <Button style={{marginTop:'20px',width:'100%',backgroundColor:'#242425',height:'50px'}}>Register</Button>
                        </Form>
                        </center>
                    </div>
                </Container>
            </div>
    </>
  );
}

export default Login;
