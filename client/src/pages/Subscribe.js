import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

//import component
import Navbar from "../components/navbar/NavbarSub"
import Subscribed from "../components/Pop-up/Subscribed"

//import data

export default function Subscribe() {

  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar />
        </Col>
        <Col md={10} className="py-5 d-flex justify-content-center align-items-center">
          <Row className="flex-column align-items-center justify-content-center">
            <h1 className="ff-times fw-bold text-center mb-5 mt-3">
              Premium
            </h1>
            <h6 className="text-center">
              Pay now and access all the latest books from <img src="/assets/icons/just-wow.png" alt="wow" style={{width: "45px"}}/>
            </h6>
            <h6 className="text-center fw-bold mb-3">
              <img src="/assets/icons/just-wow.png" alt="wow" style={{width: "45px"}}/>: 0981312323
            </h6>
            <Form className="px-1 w-80">
              <Form.Control
                name="accountNumber" 
                type="text" 
                placeholder="Input your account number"
                className="bg-gray mb-4 py-2 border-2"
              />
              <Form.Group>
                <Form.Control 
                  id="attachProof"
                  name="buktiTransfer"
                  type="file"
                  hidden
                />
                <Form.Label htmlFor="attachProof" className="form-control bg-transparent mb-4 py-2 border-2">
                  Attach proof of transfer <img src="/assets/icons/attach-file.png" alt="attach" style={{width: "16px", marginLeft: "88px"}}/>
                </Form.Label>
              </Form.Group>
              <Button onClick={() => setShowSubscribe(true)} variant="danger" className="w-100 bg-red fw-bold py-2 mt-4 mb-3">
                Send
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
      <Subscribed 
        show={showSubscribe}
        onHide={() => setShowSubscribe(false)}
      />
    </Container>
  )
}