import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/SmallFooter';
import { Container, Row, Col } from 'reactstrap';
import { firestore, auth } from '../config/firebase';
import { useHistory } from "react-router-dom";
import { useAuth } from "../config/context";

function Admin() {

    const history = useHistory();
    const { currentUser } = useAuth();

    useEffect(() => {
        if(currentUser) {
            auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
        // Confirm the user is an Admin.
            if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                console.log('Admin')
            } else {
                // Show regular user UI.
                console.log('Not Admin')
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
        <Header />
        <div className='select-game'>
            <Container>
                <div className='section'>
                    <Row>
                        <h3 style={{fontWeight:'800'}}>Admin</h3>
                    </Row>
                </div>
            </Container>
        </div>
        <Footer />
    </>
  );
}

export default Admin;
