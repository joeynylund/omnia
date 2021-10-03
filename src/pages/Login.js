import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Form, FormFeedback, FormGroup, Input, Button, Label } from 'reactstrap';
import banner from '../assets/omnia_full_dark.png';
import { useAuth } from "../config/context"
import { Link, useHistory } from "react-router-dom"

function Login() {
    const history = useHistory()
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth()
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const {id, value} = e.target
        setLoginCredentials(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(loginCredentials.email, loginCredentials.password)
        .then(() => {
          history.push('/')
        })
        .catch((error) => {
            console.log(error.code)
        })
    }
  return (
    <>
        <Header />
            <div className='select-game' style={{minHeight:'100vh'}}>
                <Container>
                    <div style={{padding:'15% 0px'}}>
                        <center>
                        <img src={banner} />
                        <Form style={{width:'500px', maxWidth:'100%', marginTop:'20px'}} onSubmit={handleSubmit}>
                            <FormGroup>
                                <Input type="email" id="email" onChange={handleChange} placeholder="Email Address" style={{height:'50px'}}></Input>
                            </FormGroup>
                            <FormGroup style={{marginTop:'10px'}}>
                                <Input type="password" id="password" onChange={handleChange} placeholder="Password" style={{height:'50px'}}></Input>
                            </FormGroup>
                            <Button style={{marginTop:'20px',width:'100%',backgroundColor:'#242425',height:'50px'}}>Login</Button>
                        </Form>
                        <p style={{marginTop:'20px'}}>Don't have an account? <Link to='/register' style={{color:'#000'}}>Create One</Link></p>
                        </center>
                    </div>
                </Container>
            </div>
    </>
  );
}

export default Login;
