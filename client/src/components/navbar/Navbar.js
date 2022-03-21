import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//import data
// import { user } from "../../fake-data/user";

//import API
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const user = props.user;

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <>
      <Link to="/home" className="d-flex justify-content-center mb-3">
        <img src="/assets/icons/slooping-wow.png" alt="logo" className="w-50" />
      </Link>
      <div className="d-flex align-items-center flex-column">
        <img
          src={
            user?.profile?.image == null
              ? "/assets/images/profile.png"
              : user.profile.image
          }
          alt="user"
          className="rounded-circle border-black mb-3"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            objectPosition: "middle",
          }}
        />
        <div>
          <h4 className="ff-bold mb-2">{user.fullName}</h4>
        </div>
        <div>
          {user.subscribe == "subscribed" ? (
            <h4 className="fc-green fs-7 fw-bold mb-3">Subscribed</h4>
          ) : (
            <h4 className="fc-red fs-7 fw-bold mb-3">Not Subscribed Yet</h4>
          )}
        </div>
      </div>
      <div className="border-top border-bottom border-2 py-5 mb-5">
        <Link to="/profile" className="d-block mb-5 nav-item">
          <img
            src="/assets/icons/user.png"
            alt="icon"
            style={{ width: "22px", height: "22px" }}
          />
          <span className="fc-gray ms-3 h5">Profile</span>
        </Link>
        <Link to="/subscribe" className="d-block nav-item">
          <img
            src="/assets/icons/bill.png"
            alt="icon"
            style={{ width: "24px", height: "26px" }}
          />
          <span className="fc-gray ms-3 h5">Subscribe</span>
        </Link>
      </div>
      <div>
        <Button
          onClick={logout}
          variant="light"
          className="bg-transparent fc-gray ol-none"
        >
          <img src="/assets/icons/logout.png" alt="icon" />
          <span className="ms-3 h5">Logout</span>
        </Button>
      </div>
    </>
  );
}
