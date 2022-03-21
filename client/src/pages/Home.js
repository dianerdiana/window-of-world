import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//import component
import Navbar from "../components/navbar/Navbar";
import Unsubscribed from "../components/Pop-up/Unsubscribed";

//import data
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { listBook } from "../fake-data/list-book";

export default function Home() {
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [listBooks, setListBooks] = useState([]);

  const user = state.user;

  const getBooks = async () => {
    const response = await API.get("/books");

    setListBooks(response.data.data.books);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar />
        </Col>
        <Col md={10} className="py-5">
          <Row>
            <Col>
              <img
                src="/assets/images/banner.png"
                alt="banner"
                style={{ width: "100%", height: "440px" }}
              />
            </Col>
          </Row>
          <Row className="flex-column">
            <Col>
              <h1 className="ff-times fw-bold mb-5 mt-3">List Book</h1>
            </Col>
            <Col className="d-flex">
              {listBooks?.map((item) => {
                return (
                  <div key={item.id} className="list-book me-5">
                    {user.subscribe === "subscribed" ? (
                      <Link to={"/detail-book/" + item.id}>
                        <img
                          src={
                            "http://localhost:5000/uploads/images/" + item.image
                          }
                          alt={item.image}
                          className="list-book rounded-3"
                        />
                      </Link>
                    ) : (
                      <Button
                        className="bg-transparent ol-none p-0"
                        onClick={() => setUnsubscribed(true)}
                      >
                        <img
                          src={
                            "http://localhost:5000/uploads/images/" + item.image
                          }
                          alt={item.image}
                          className="list-book rounded-3"
                        />
                      </Button>
                    )}
                    <h5 className="ff-times fw-bold mt-3">{item.title}</h5>
                    <h6 className="fc-gray">{item.author}</h6>
                  </div>
                );
              })}
            </Col>
            <Unsubscribed show={unsubscribed} onHide={setUnsubscribed} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
