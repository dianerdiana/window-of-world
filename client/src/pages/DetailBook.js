import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

//import component
import Navbar from "../components/navbar/Navbar"

//import data

export default function DetailBook() {

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar />
        </Col>
        <Col md={9} className="py-5 ms-auto">
          <Row>
            <Col md={5}>
              <img src="/assets/images/tess-road.png" alt="detail-book" className="w-100"/>
            </Col>
            <Col className="ms-3">
              <div className="mb-5">
                <h1 className="ff-times fw-bold fs-0">
                  Tess on the Road
                </h1>
                <h6 className="fc-gray">
                  Rachel Hartman
                </h6>
              </div>
              <div>
                <h5 className="fw-bolder">
                  Publication Date
                </h5>
                <h6 className="fc-gray mb-4">
                  April 2020
                </h6>
                <h5 className="fw-bolder">
                  Pages
                </h5>
                <h6 className="fc-gray mb-4">
                  436
                </h6>
                <h5 className="fw-bolder fc-red">
                  ISBN
                </h5>
                <h6 className="fc-gray">
                  9781789807554
                </h6>
              </div>
            </Col>
          </Row>
          <Row className="flex-column mt-5">
            <Col>
              <h1 className="ff-times fw-bold mb-3">
                About this Book
              </h1>
            </Col>
            <Col className="fs-5 fc-gray">
            In the medieval kingdom of Goredd, women are expected to be ladies, men are their protectors, and dragons get to be whomever they want. Tess, stubbornly, is a troublemaker. You can’t make a scene at your sister’s wedding and break a relative’s nose with one punch (no matter how pompous he is) and not suffer the consequences. As her family plans to send her to a nunnery, Tess yanks on her boots and sets out on a journey across the Southlands, alone and pretending to be a boy.
            <br />
            <br />
            Where Tess is headed is a mystery, even to her. So when she runs into an old friend, it’s a stroke of luck. This friend is a quigutl—a subspecies of dragon—who gives her both a purpose and protection on the road. But Tess is guarding a troubling secret. Her tumultuous past is a heavy burden to carry, and the memories she’s tried to forget threaten to expose her to the world in more ways than one.
            <br />
            <br />
            Returning to the fascinating world she created in the award-winning and New York Times bestselling Seraphina, Rachel Hartman introduces readers to a new character and a new quest, pushing the boundaries of genre once again in this wholly original fantasy.
            </Col>
            <Col className="mt-5 d-flex justify-content-end">
              <Button 
                variant="danger"
                className="bg-red ol-none py-2 px-3"
              >
                Add My List
                <img className="ms-2" src="/assets/icons/marker.png" alt="add-my-list"/>
              </Button>
              <Link 
                to="/read-book"
                variant="secondary"
                className="btn bg-grey ol-none ms-4 py-2 px-3">
                Read Book
                <img className="ms-2" src="/assets/icons/V.png" alt="add-my-list"/>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}