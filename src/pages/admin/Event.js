import React, {useState, useEffect} from 'react';
import AdminHeader from '../../components/AdminHeader';
import SmallFooter from '../../components/SmallFooter';
import { firestore, auth } from '../../config/firebase';
import { Container, Row, Col, FormFeedback, FormGroup, Input, Button, Table } from 'reactstrap';
import { useAuth } from "../../config/context"
import { Link, useHistory, useParams } from "react-router-dom"

function UpdateEvent() {
    const history = useHistory()
    const [profile, setProfile] = useState({});
    const [ignError, setIgnError] = useState('');
    const [files, setFiles] = useState('');
    let { id } = useParams();
    const [event, setEvent] = useState({});
    const { currentUser } = useAuth();

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }

    const handleChange = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setFiles(base64)
    }

    useEffect(() => {
        if(currentUser) {
            auth.currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                if (!!idTokenResult.claims.admin) {
                    firestore.collection('events').doc(id).get()
                    .then((doc) => {
                        if(doc.exists === true) {
                            setEvent({
                                ...doc.data(),
                            })
                        } else {
                            alert('No event found')
                        }
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
                } else {
                    history.push('/')
                }
            });
        }
        
      }, [])
  return (
    <>
        <AdminHeader />
            <div className='select-game' style={{minHeight:'100vh'}}>
                <Container>
                    <div style={{padding:'5% 0px'}}>
                        <center>
                            <h2 style={{fontWeight:'900'}}>Edit Event Details</h2>
                                <>
                                <h5 style={{margin:'0'}}>Event Name</h5>
                                <Row style={{justifyContent:'center'}}>
                                    <FormGroup style={{marginTop:'10px'}}>
                                        <Input type="text" id="ign" value={event.name} onChange={(e) => {
                                            setIgnError('')
                                            setProfile({...profile, ign: e.target.value})
                                        }} style={{height:'50px',width:'400px',maxWidth:'100%'}} invalid={ ignError === '' ? false : true}/>
                                        <FormFeedback style={{width:'100%',textAlign:'left'}}>{ignError}</FormFeedback>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <h5 style={{margin:'0'}}>Series</h5>
                                <Row style={{justifyContent:'center'}}>
                                    <FormGroup style={{marginTop:'10px'}}>
                                        <Input type="text" id="ign" value={event.seriesname} onChange={(e) => {
                                            setIgnError('')
                                            setProfile({...profile, ign: e.target.value})
                                        }} style={{height:'50px',width:'400px',maxWidth:'100%'}} invalid={ ignError === '' ? false : true}/>
                                        <FormFeedback style={{width:'100%',textAlign:'left'}}>{ignError}</FormFeedback>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <h5 style={{margin:'0'}}>Event Overview</h5>
                                <Row style={{justifyContent:'center'}}>
                                    <FormGroup style={{marginTop:'10px'}}>
                                        <Input type="textarea" id="ign" value={event.eventoverview} onChange={(e) => {
                                            setEvent({...event, eventoverview: e.target.value})
                                        }} style={{width:'400px',maxWidth:'100%'}} invalid={ ignError === '' ? false : true}/>
                                        <FormFeedback style={{width:'100%',textAlign:'left'}}>{ignError}</FormFeedback>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <h5 style={{margin:'0'}}>Event Rules & Instructions</h5>
                                <Row style={{justifyContent:'center'}}>
                                    <FormGroup style={{marginTop:'10px'}}>
                                        <Input type="textarea" id="ign" value={event.rulesinstructions} onChange={(e) => {
                                            setEvent({...event, rulesinstructions: e.target.value})
                                        }} style={{width:'400px',maxWidth:'100%'}} invalid={ ignError === '' ? false : true}/>
                                        <FormFeedback style={{width:'100%',textAlign:'left'}}>{ignError}</FormFeedback>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <h5 style={{margin:'0'}}>Game</h5>
                                <Row style={{justifyContent:'center'}}>
                                    <FormGroup style={{marginTop:'10px'}}>
                                        <Input type="text" id="ign" value={event.game} onChange={(e) => {
                                            setIgnError('')
                                            setProfile({...profile, ign: e.target.value})
                                        }} style={{height:'50px',width:'400px',maxWidth:'100%'}} invalid={ ignError === '' ? false : true}/>
                                        <FormFeedback style={{width:'100%',textAlign:'left'}}>{ignError}</FormFeedback>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <h5 style={{margin:'0'}}>Start Date</h5>
                                <Row style={{justifyContent:'center'}}>
                                    <FormGroup style={{marginTop:'10px'}}>
                                        <Input type="text" id="ign" value={event.start_date} onChange={(e) => {
                                            setIgnError('')
                                            setProfile({...profile, ign: e.target.value})
                                        }} style={{height:'50px',width:'400px',maxWidth:'100%'}} invalid={ ignError === '' ? false : true}/>
                                        <FormFeedback style={{width:'100%',textAlign:'left'}}>{ignError}</FormFeedback>
                                    </FormGroup>
                                </Row>
                                <br/>
                                <h5 style={{margin:'0'}}>Registered Teams</h5>
                                <br/>
                                <Row style={{justifyContent:'center'}}>
                                    <Table striped bordered>
                                        <tr>
                                            <th>Team Name</th>
                                            <th>Capt. Discord</th>
                                            <th>Members</th>
                                            <th>Score</th>
                                            <th>Placement</th>
                                        </tr>
                                        
                                    </Table>
                                </Row>
                                </>
                            <Button className="profile-next-btn" style={{backgroundColor:'#242425',height:'50px'}} size="lg">Update Event</Button>
                        </center>
                    </div>
                    
                </Container>
            </div>
        <SmallFooter />
    </>
  );
}

export default UpdateEvent;
