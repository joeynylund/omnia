import React, { useState } from 'react';
import logo from '../assets/omnia-small.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {
  Link, useHistory
} from "react-router-dom";
import { useAuth } from "../config/context"

const Header = (props) => {

  const history = useHistory()

  const { currentUser, admin, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout()
    .then(() => {
      history.push('/login')
    })
  }

  return (
    <>
      <Navbar color="light" light expand="md">
        <Link to="/">
          <NavbarBrand><img src={logo} width='50' /></NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
            <UncontrolledDropdown style={{display:"block",textAlign:'center'}}>
              <DropdownToggle nav caret style={{padding:'8px'}}>
                <div style={{display:'inline-block',alignItems:'center'}}>
                  <h6 style={{display:'inline', color:'#000'}}>OMNIA NFT'S</h6>
                </div>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  OMNIA MEDALS
                </DropdownItem>
                <DropdownItem>
                  PLAYER CARDS
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavbarText style={{padding:'8px',fontWeight:'500',color:'#000',display:'block',textAlign:'center',cursor:'pointer'}}>ABOUT</NavbarText>
            {currentUser !== null ? 
            <UncontrolledDropdown style={{display:"block",textAlign:'center'}}>
            <DropdownToggle nav caret style={{padding:'8px'}}>
              <div style={{display:'inline-block',alignItems:'center'}}>
                <h6 style={{display:'inline', color:'#000'}}>{currentUser.displayName !== null ? currentUser.displayName.toUpperCase() : localStorage.getItem('userName')}</h6>
              </div>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => history.push('/profile/' + currentUser.displayName)}>
                ATHLETE PROFILE
              </DropdownItem>
              <DropdownItem>
                TEAMS
              </DropdownItem>
              <DropdownItem>
                ACCOUNT SETTINGS
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                LOGOUT
              </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            : <Link to="/login">
              <NavbarText style={{padding:'8px',fontWeight:'500',color:'#000',display:'block',textAlign:'center',cursor:'pointer'}}>LOGIN</NavbarText>
            </Link> }            
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;