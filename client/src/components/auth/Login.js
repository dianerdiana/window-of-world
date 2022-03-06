import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login(props) {

  const navigate = useNavigate();

  const submit = () => {
    return navigate("/home")
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
            className="bg-gray mb-4 py-2"
          />
          <Form.Control 
            name="password"
            type="password" 
            placeholder="Password"
            className="bg-gray mb-4 py-2"
          />
          <Button onClick={submit} variant="danger" className="w-100 bg-red fw-bold py-2 mt-2 mb-3">
            Sign In
          </Button>

          <p className="mb-0 ms-5 me-5">
            Don't have an account ? Klik <span className="ff-bold">Here</span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  )
}