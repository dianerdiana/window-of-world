import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

//import component
import Navbar from "../components/navbar/Navbar"
import Unsubscribed from "../components/Pop-up/Unsubscribed"

//import data
import { listBook } from "../fake-data/list-book";
import { user } from "../fake-data/user";

export default function Home() {

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar/>
        </Col>
        <Col md={10} className="py-5">
          <Row>
            <Col>
              <img src="/assets/images/banner.png" alt="banner" style={{width: "100%", height: "440px"}}/>
            </Col>
          </Row>
          <Row className="flex-column">
            <Col>
              <h1 className="ff-times fw-bold mb-5 mt-3">
                List Book
              </h1>
            </Col>
            <Col className="d-flex">
              {listBook.map((item) => {
                return (
                  <div key={item.id} className="list-book me-5">
                    <Link to={user.subscribe == "subscribed"? "/detail-book/" + item.id : "/home"}>
                      <img src={item.image} alt={item.image} className="list-book w-100"/>
                    </Link>
                    <h5 className="ff-times fw-bold mt-3">{item.title}</h5>
                    <h6 className="fc-gray">{item.author}</h6>
                  </div>
                )
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}