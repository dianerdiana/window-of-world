import { useState, useContext } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//import api
import { API } from "../../config/api";

import { UserContext } from "../../context/userContext";

export default function Login(props) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  // Store data with useState here ...
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify(form);

      // Insert data user for login process here ...
      const response = await API.post("/login", body, config);

      // Checking process
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        // Status check
        if (response.data.data.user.role == "admin") {
          navigate("/list-transactions");
        } else {
          navigate("/home");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      contentClassName="modal-form"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="px-4 py-5">
        <Form onSubmit={handleSubmit} className="px-1">
          <h1 className="ff-bold mb-4">Sign In</h1>
          {message && message}
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="bg-gray mb-4 py-2"
          />
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="bg-gray mb-4 py-2"
          />
          <Button
            type="submit"
            variant="danger"
            className="w-100 bg-red fw-bold py-2 mt-2 mb-3"
          >
            Sign In
          </Button>

          <p className="mb-0 ms-5 me-5">
            Don't have an account ? Klik{" "}
            <span
              onClick={props.modal}
              className="ff-bold"
              style={{ cursor: "pointer" }}
            >
              Here
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
