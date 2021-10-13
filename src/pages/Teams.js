import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Button } from 'reactstrap';
import { firestore, auth } from '../config/firebase';
import logo from '../assets/omnia-small.png';
import { useHistory } from "react-router-dom";
import { useAuth } from "../config/context";

function Teams () {

    const history = useHistory();
    const { currentUser } = useAuth();
    const [teams, setTeams] = useState([]);

    useEffect(() => {

        firestore.collection('teams').where('members','array-contains','Nylunddd').get().then((querySnapshot) => {
            var userTeams = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data().name);
                userTeams.push({
                    id: doc.id,
                    name: doc.data().name,
                    logo: doc.data().logo,
                    members: doc.data().members,
                    game: doc.data().game,
                    captain: doc.data().captain
                })
            });
            setTeams(userTeams)
        });

    }, [])

  return (
    <>
        <Header />
        <div style={{backgroundColor:'#000',padding:'20px',display:'flex',justifyContent:'center'}}><h1 style={{color:'#fff',fontWeight:'800'}}>{currentUser.displayName.toUpperCase()}'s TEAMS</h1></div>
        <div className='select-game'>
            <Container>
                <div className='section'>
                    <Row style={{display:'flex', justifyContent:'center'}}>
                        {teams.length > 0 ? teams.map((team) => (
                            <Col md="3" style={{display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}}>
                                <div style={{width:'250px', height:'250px', backgroundColor:'#eee', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px'}}>
                                    <img src={logo} style={{maxWidth:'100%'}} />
                                </div>
                                <h3 style={{marginTop:'15px'}}>{team.name}</h3>
                            </Col>
                        )) : <h2 style={{textAlign:'center'}}>You are not apart of any teams. Create one below!</h2>}
                    </Row>
                    <center>
                        <Button style={{backgroundColor:'#121212',color:'#fff',padding:'10px 40px',marginTop:'20px',fontWeight:'800'}} size='lg'>+ NEW TEAM</Button>
                    </center>
                </div>
            </Container>
        </div>
        <Footer />
    </>
  );
}

export default Teams;
