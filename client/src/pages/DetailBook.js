import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//import component
import Navbar from "../components/navbar/Navbar";

//import data
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailBook() {
  const [state, dispatch] = useContext(UserContext);
  const [book, setBook] = useState([]);
  const [isMyBook, setIsMyBook] = useState(null);
  const params = useParams();

  const user = state.user;

  const getBook = async () => {
    const response = await API.get("/book/" + params.id);

    setBook(response.data.data.book);
  };

  const checkBook = async () => {
    const response = await API.get("/is-my-book/" + params.id);

    setIsMyBook(response.data.data.myBook);
  };

  const addMyBook = async () => {
    const response = await API.post("/add-my-book/" + params.id);

    checkBook();
  };

  useEffect(() => {
    getBook();
    checkBook();
  }, []);
  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar />
        </Col>
        <Col md={9} className="py-5 ms-auto">
          <Row>
            <Col md={5}>
              <img
                src={book?.image}
                alt="detail-book"
                className="w-100 rounded-3"
              />
            </Col>
            <Col className="ms-3">
              <div className="mb-5">
                <h1 className="ff-times fw-bold fs-0">{book?.title}</h1>
                <h6 className="fc-gray">{book?.author}</h6>
              </div>
              <div>
                <h5 className="fw-bolder">Publication Date</h5>
                <h6 className="fc-gray mb-4">{book?.publicationDate}</h6>
                <h5 className="fw-bolder">Pages</h5>
                <h6 className="fc-gray mb-4">{book?.pages}</h6>
                <h5 className="fw-bolder fc-red">ISBN</h5>
                <h6 className="fc-gray">{book?.isbn}</h6>
              </div>
            </Col>
          </Row>
          <Row className="flex-column mt-5">
            <Col>
              <h1 className="ff-times fw-bold mb-3">About this Book</h1>
            </Col>
            <Col className="fs-5 fc-gray">{book?.about}</Col>
            <Col className="mt-5 d-flex justify-content-end">
              {isMyBook === null ? (
                <Button
                  onClick={addMyBook}
                  variant="danger"
                  className="bg-red ol-none py-2 px-3"
                >
                  Add My List
                  <img
                    className="ms-2"
                    src="/assets/icons/marker.png"
                    alt="add-my-list"
                  />
                </Button>
              ) : (
                <></>
              )}
              <Link
                to={"/read-book/" + book?.id}
                variant="secondary"
                className="btn bg-grey ol-none ms-4 py-2 px-3"
              >
                Read Book
                <img
                  className="ms-2"
                  src="/assets/icons/V.png"
                  alt="add-my-list"
                />
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
