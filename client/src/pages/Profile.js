import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

//import component
import NavbarProf from "../components/navbar/NavbarProf";

//import data
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

export default function Profile() {
  const title = "Profile";
  document.title = "WOW | " + title;

  const [state, dispatch] = useContext(UserContext);
  const [myBooks, setMyBooks] = useState([]);
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await API.get("/user");

      console.log(response);
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyBooks = async () => {
    try {
      const response = await API.get("/my-books");

      setMyBooks(response.data.data.myBooks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyBooks();
    getUser();
  }, []);

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <NavbarProf user={user} />
        </Col>
        <Col md={9} className="py-5 ms-5">
          <Row className="flex-column">
            <Col>
              <h1 className="ff-times fw-bold mb-4">Profile</h1>
            </Col>
            <Col className="d-flex bg-pink py-4 px-5 rounded-3 mb-5 ms-3">
              <div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/mail.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">{user?.email}</span>
                    <span className="d-block fs-6 fc-gray mt-1">Email</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/gender.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">
                      {user?.profile?.gender == null
                        ? "Please Choose Your Gender"
                        : user.profile.gender}
                    </span>
                    <span className="d-block fs-6 fc-gray mt-1">Gender</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/phone.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">
                      {user?.profile?.phone}
                    </span>
                    <span className="d-block fs-6 fc-gray mt-1">
                      Mobile Phone
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="icon-profile">
                    <img src="/assets/icons/location.png" alt="email" />
                  </div>
                  <div className="ms-3">
                    <span className="d-block fs-6 fw-bold">
                      {user?.profile?.address}
                    </span>
                    <span className="d-block fs-6 fc-gray mt-1">Address</span>
                  </div>
                </div>
              </div>
              <div className="ms-auto">
                <div className="mt-4 rounded-3">
                  <img
                    src={
                      user?.profile?.image == null
                        ? "/assets/images/profile.png"
                        : user.profile.image
                    }
                    alt="profile"
                    style={{
                      width: "220px",
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div>
                  <Button variant="danger" className="bg-red w-100 mt-3 py-2">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Col>
            <Col>
              <h1 className="ff-times fw-bold mb-5">My List Book</h1>
              <div className="d-flex">
                {myBooks?.map((item, index) => {
                  return (
                    <div key={index} className="list-book me-5">
                      <Link to={"/detail-book/" + item.user_book.id}>
                        <img
                          src={
                            "http://localhost:5000/uploads/images/" +
                            item.user_book.image
                          }
                          alt={item.user_book.image}
                          className="img-list-book w-100 rounded-3"
                        />
                      </Link>
                      <h5 className="ff-times fw-bold mt-3">
                        {item.user_book.title}
                      </h5>
                      <h6 className="fc-gray">{item.user_book.author}</h6>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
