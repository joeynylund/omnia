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
    const [agents, setAgents] = useState([]);
    const [profile, setProfile] = useState({});
    const { currentUser } = useAuth()
    const [step, setStep] = useState(0);

    const handleChange = (e) => {
        
    }

    const step1 = async (e) => {
        e.preventDefault();
        setStep(step + 1);
    }

    const handleSubmit = e => {
        
    }

    function getAgents(game) {
        console.log('Test')
        firestore.collection('agents').where('game','==',game).get()
        .then((querySnapshot) => {
            var gameAgents = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                gameAgents.push(doc.data())
            });
            setAgents(gameAgents)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
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
                            <div style={{backgroundColor:'#fff',padding:'40px 20px',borderRadius:'10px',maxWidth:'1000px',border:'1px solid #ccc'}}>
                                {step === 0 && <>
                                <h5 style={{margin:'0'}}>Which of the supported Omnia titles do you primarily compete in?</h5>
                                <p><i>Providing this information will determine the rest of your Profile setup</i></p>
                                {games && games.map((game) => (
                                    <img src={'data:image/jpeg;base64,' + game.image} onClick={() => setProfile({...profile, 'game': game.name})} style={{width:'200px',margin:'0px 15px',borderRadius:'10px', outline: profile.game === game.name ? '5px solid #000' : 'none'}} />
                                ))}
                                </>}
                                {step === 1 && 
                                <>
                                <h5 style={{margin:'0'}}>Who do you play as?</h5>
                                <p><i>Select your primary (main) agent and a secondary agent</i></p>
                                {getAgents(profile.game)}
                                {agents && agents.map((agent) => (
                                    <img src={'data:image/jpeg;base64,' + agent.image} style={{width:'100px',margin:'5px'}} />
                                ))}
                                </>}
                            </div>
                            {step !== 0 && <Button className="profile-back-btn" style={{backgroundColor:'#616161',height:'50px',width:'200px'}} onClick={() => setStep(step - 1)} size="lg">Back</Button>}
                            <Button className="profile-next-btn" style={{backgroundColor:'#242425',height:'50px',width:'200px'}} onClick={() => setStep(step + 1)} disabled={profile.game === undefined ? true : false} size="lg">Next</Button>
                        </center>
                    </div>
                </Container>
            </div>
        <SmallFooter />
    </>
  );
}

export default Register;
