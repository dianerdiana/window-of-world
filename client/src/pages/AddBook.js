import { Container, Row, Col, Form, Button } from "react-bootstrap";

//import component
import NavAdmin from "../components/navbar/NavAdmin";


export default function AddBook() {

  return (
    <Container fluid>
      <Row className="py-2">
        <NavAdmin />
      </Row>
      <Row className="flex-column align-items-center mt-3">
        <Col className="w-80">
          <h1 className="ff-times fw-bold">
            Add Book
          </h1>
        </Col>
        <Col className="w-80">
          <Form className="py-5">

            <Form.Control className="mb-4 py-2 bg-gray border-2" type="text" placeholder="Title"/>

            <Form.Control className="mb-4 py-2 bg-gray border-2" type="text" placeholder="Publication Date" />

            <Form.Control className="mb-4 py-2 bg-gray border-2" type="text" placeholder="Pages" />

            <Form.Control className="mb-4 py-2 bg-gray border-2" type="text" placeholder="Author" />

            <Form.Control className="mb-4 py-2 bg-gray border-2" type="text" placeholder="ISBN" />

            <Form.Control className="mb-4 py-2 bg-gray border-2" as="textarea" placeholder="About This Book" rows={6} />
            
            <Form.Group className="form-group">
              <Form.Control id="input-file" className="input-file" type="file" hidden/>
              <Form.Label 
                htmlFor="input-file" 
                className="p-2 border-input bg-gray rounded-3"
              >
                <span className="me-2">Attach Book File</span>
                <img src="/assets/icons/grey-attach-file.png" alt="attach" style={{width: "15px"}}/>
              </Form.Label>
            </Form.Group>

            <Form.Group className="d-flex justify-content-end mt-3">
              <Button variant="danger" className="bg-orange py-2 ol-none">
                Add Book
                <img src="/assets/icons/add-book.png" alt="add-book" className="ms-3"/>
              </Button>
            </Form.Group>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}