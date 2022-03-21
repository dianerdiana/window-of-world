import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

import { API } from "../../config/api";

export default function Register(props) {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { email, password, fullName } = form;

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

      // Insert data user to database here ...
      const response = await API.post("/register", body, config);

      // Notification
      if (response.data.status == "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success! Please login from registered account.
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed Oi
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
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
        <Form onSubmit={handleSubmit} className="px-2">
          <h1 className="ff-bold mb-4">Sign Up</h1>

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
          <Form.Control
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={handleChange}
            className="bg-gray mb-4 py-2"
          />
          <Button
            type="submit"
            variant="danger"
            className="w-100 bg-red fw-bold py-2 mt-2 mb-3"
          >
            Sign Up
          </Button>

          <p className="mb-0 ms-5 me-4">
            Already have an account ? Klik{" "}
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
