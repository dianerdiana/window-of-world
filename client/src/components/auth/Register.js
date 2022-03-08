import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

//import component
import Login from "./Login";

export default function Register(props) {

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: ""
  })

  const handleChange = (e) => {
    setForm({
      [e.target.name]: e.target.value
    });
  };

  return(
    <Modal
      {...props}
      contentClassName="modal-form"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="px-4 py-5">
        <Form className="px-2">
          <h1 className="ff-bold mb-4">
            Sign Up
          </h1>
          <Form.Control
            name="email" 
            type="email" 
            placeholder="Email"
            onChange={handleChange}
            className="bg-gray mb-4 py-2"
          />
          <Form.Control 
            name="password"
            type="password" 
            placeholder="Password"
            onChange={handleChange}
            className="bg-gray mb-4 py-2"
          />
          <Form.Control 
            name="fullName"
            type="text" 
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-gray mb-4 py-2"
          />
          <Button variant="danger" className="w-100 bg-red fw-bold py-2 mt-2 mb-3">
            Sign Up
          </Button>

          <p className="mb-0 ms-5 me-4">
            Already have an account ? Klik <span onClick={props.trigger} className="ff-bold" style={{cursor: "pointer"}}>Here</span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  )
}