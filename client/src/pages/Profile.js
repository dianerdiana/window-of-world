import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

//import component
import Navbar from "../components/navbar/NavbarProf"

//import data
import { myListBook } from "../fake-data/my-list-book"

export default function Profile() {

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar />
        </Col>
        <Col md={9} className="py-5 ms-5">
          <Row className="flex-column">
            <Col>
              <h1 className="ff-times fw-bold mb-4">
                Profile
              </h1>
            </Col>
            <Col className="d-flex bg-pink py-4 px-5 rounded-3 mb-5 ms-3">
              <div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/mail.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">egigans@gmail.com</span>
                    <span className="d-block fs-6 fc-gray mt-1">Email</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/gender.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">Male</span>
                    <span className="d-block fs-6 fc-gray mt-1">Gender</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/phone.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">0812-8623-8911</span>
                    <span className="d-block fs-6 fc-gray mt-1">Mobile Phone</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/location.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">Perumahan Permata Bintaro Residence C-3</span>
                    <span className="d-block fs-6 fc-gray mt-1">Address</span>
                  </div>
                </div>
              </div>
              <div className="ms-auto">
                <div className="mt-4 rounded-3">
                  <img src="/assets/images/profile.png" alt="profile" 
                    style={{
                      width: "220px",
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "4px"
                    }}/>
                </div>
                <div>
                  <Button variant="danger" className="bg-red w-100 mt-3 py-2">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Col>
            <Col>
              <h1 className="ff-times fw-bold mb-5">
                My List Book
              </h1>
              <div className="d-flex">
                {myListBook.map((item) => {
                  return (
                    <div key={item.id} className="my-list-book me-5">
                      <Link to={"/detail-book/" + item.id}>
                        <img src={item.image} alt={item.image} className="my-list-book w-100"/>
                      </Link>
                      <h4 className="ff-times fw-bold mt-3">{item.title}</h4>
                      <h6 className="fc-gray">{item.author}</h6>
                    </div>
                  )
                })}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}