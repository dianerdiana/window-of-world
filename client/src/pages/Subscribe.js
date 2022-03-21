import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//import component
import Navbar from "../components/navbar/NavbarSub";
import Subscribed from "../components/Pop-up/Subscribed";

//import data
import { API } from "../config/api";

export default function Subscribe() {
  const navigate = useNavigate();
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    accountNumber: "",
    transferProof: "",
  });

  const { accountNumber, transferProof } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: multipart/form-data
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Create store data with FormData as object here ...
      const formData = new FormData();

      formData.set(
        "transferProof",
        form.transferProof[0],
        form.transferProof[0].name
      );
      formData.set("accountNumber", form.accountNumber);

      // Insert product data here ...
      const response = await API.post("/transaction", formData, config);

      console.log(response);

      if (response.status == 200) {
        setShowSubscribe(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="container-fluid py-2">
      <Row>
        <Col md={2}>
          <Navbar />
        </Col>
        <Col
          md={10}
          className="py-5 d-flex justify-content-center align-items-center"
        >
          <Row className="flex-column align-items-center justify-content-center">
            <h1 className="ff-times fw-bold text-center mb-5 mt-3">Premium</h1>
            <h6 className="text-center">
              Pay now and access all the latest books from{" "}
              <img
                src="/assets/icons/just-wow.png"
                alt="wow"
                style={{ width: "45px" }}
              />
            </h6>
            <h6 className="text-center fw-bold mb-3">
              <img
                src="/assets/icons/just-wow.png"
                alt="wow"
                style={{ width: "45px" }}
              />
              : 0981312323
            </h6>
            <Form onSubmit={handleSubmit} className="px-1 w-80">
              <Form.Control
                name="accountNumber"
                type="text"
                onChange={handleChange}
                value={accountNumber}
                placeholder="Input your account number"
                className="bg-gray mb-4 py-2 border-2"
              />
              <Form.Group>
                <Form.Control
                  id="attachProof"
                  name="transferProof"
                  type="file"
                  onChange={handleChange}
                  hidden
                />
                <Form.Label
                  htmlFor="attachProof"
                  className="form-control bg-transparent mb-4 py-2 border-2"
                >
                  Attach proof of transfer{" "}
                  <img
                    src="/assets/icons/attach-file.png"
                    alt="attach"
                    style={{ width: "16px", marginLeft: "88px" }}
                  />
                </Form.Label>

                {preview && (
                  <div>
                    <img
                      src={preview}
                      style={{
                        maxWidth: "150px",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      alt="preview"
                    />
                  </div>
                )}
              </Form.Group>
              <Button
                type="submit"
                variant="danger"
                className="w-100 bg-red fw-bold py-2 mt-4 mb-3"
              >
                Send
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
      <Subscribed show={showSubscribe} onHide={() => setShowSubscribe(false)} />
    </Container>
  );
}
