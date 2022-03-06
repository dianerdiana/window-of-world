import { Modal, Button, Form } from "react-bootstrap";

export default function Register(props) {

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
            className="bg-gray mb-4 py-2"
          />
          <Form.Control 
            name="password"
            type="password" 
            placeholder="Password"
            className="bg-gray mb-4 py-2"
          />
          <Form.Control 
            name="fullname"
            type="text" 
            placeholder="Full Name"
            className="bg-gray mb-4 py-2"
          />
          <Button variant="danger" className="w-100 bg-red fw-bold py-2 mt-2 mb-3">
            Sign Up
          </Button>

          <p className="mb-0 ms-5 me-4">
          Already have an account ? Klik <span className="ff-bold">Here</span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  )
}