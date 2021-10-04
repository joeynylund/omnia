import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import SmallFooter from '../components/SmallFooter';
import { firestore } from '../config/firebase';
import { Container, Row, Col, Form, FormFeedback, FormGroup, Input, Button, Label } from 'reactstrap';
import { useAuth } from "../config/context"
import { Link, useHistory } from "react-router-dom"

function Register() {
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
                    <div style={{padding:'5% 0px'}}>
                        <center>
                            <h2 style={{fontWeight:'900'}}>Athlete Profile</h2>
                            <div style={{backgroundColor:'#fff',padding:'40px 20px',borderRadius:'10px',maxWidth:'800px',border:'1px solid #ccc'}}>
                                <h5 style={{margin:'0'}}>Which of the supported Omnia titles do you primarily compete in?</h5>
                                <p><i>Providing this information will determine the rest of your Profile setup</i></p>
                                {games && games.map((game) => (
                                    <img src={'data:image/jpeg;base64,' + game.image} style={{width:'200px',margin:'0px 15px',borderRadius:'10px'}} />
                                ))}
                            </div>
                        </center>
                    </div>
                </Container>
            </div>
        <SmallFooter />
    </>
  );
}

export default Register;
