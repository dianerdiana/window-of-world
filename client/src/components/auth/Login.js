import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//import component
import Register from "./Register"

export default function Login(props) {

  const navigate = useNavigate();

  // const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const {email, password} = form

  const handleChange = (e) => {
    setForm({
      [e.target.name]: e.target.value
    });
  };

  const openRegister = async () => {
    await setShowRegister(true)
  }

  const submit = () => {
    if (email == "dierd@gmail.com") {
      navigate("/list-transactions")
    } else {
      navigate("/home")
    }
  }

  return(
    <Modal
      {...props}
      contentClassName="modal-form"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="px-4 py-5">
        <Form className="px-1">
          <h1 className="ff-bold mb-4">
            Sign In
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
          <Button onClick={submit} variant="danger" className="w-100 bg-red fw-bold py-2 mt-2 mb-3">
            Sign In
          </Button>

          <p className="mb-0 ms-5 me-5">
            Don't have an account ? Klik <span onClick={props.trigger} className="ff-bold" style={{cursor: "pointer"}}>Here</span>
          </p>
          <Register 
            show={showRegister}
            onHide={()=> setShowRegister(false)}
          />
        </Form>
      </Modal.Body>
    </Modal>
  )
}