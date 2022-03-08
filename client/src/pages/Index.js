import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

// import component
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"

export default function Index() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const modalSignIn = async (e) => {
    await setShowLogin(true);
    setShowRegister(false);
  }

  const modalSignUp = async (e) => {
    await setShowRegister(true);
    setShowLogin(false)
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <div className="hero-title mt-5">
            <img src="/assets/icons/straight-wow.png" alt="window-of-world"/>
          </div>
          <div className="hero-desc ms-4">
            Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia
          </div>
          <div className="ms-4 mt-5">
            <Button 
              onClick={modalSignUp}
              variant="danger" 
              className="ol-none px-5 py-2 bg-red fw-bold"
            >
              Sign Up
            </Button>

            <Button 
              onClick={modalSignIn}
              variant="secondary" 
              className="ol-none px-5 py-2 ms-5 bg-grey fw-bold"
            >
              Sign In
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <img className="hero-rack" src="/assets/images/rack.svg" alt="background"/>
        </Col>
      </Row>
      <Login 
        trigger={modalSignUp}
        show={showLogin}
        onHide={()=> setShowLogin(false)}
      />

      <Register 
        trigger={modalSignIn}
        show={showRegister}
        onHide={()=> setShowRegister(false)}
      />
    </Container>
  )
}