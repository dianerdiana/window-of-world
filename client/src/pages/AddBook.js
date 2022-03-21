import { Container, Row, Col, Form, Button } from "react-bootstrap";

//import component
import NavAdmin from "../components/navbar/NavAdmin";

import { API } from "../config/api";
import { useState } from "react";

export default function AddBook() {
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    image: "",
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookFile: "",
  });

  const { title, publicationDate, pages, author, isbn, about } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file" && e.target.name === "image") {
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

      formData.set("image", form.image[0], form.image[0].name);
      formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);

      // Insert product data here ...
      const response = await API.post("/add-book", formData, config);

      if (response.status == 200) {
        console.log("Add book success");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <Row className="py-2">
        <NavAdmin />
      </Row>
      <Row className="flex-column align-items-center mt-3">
        <Col className="w-80">
          <h1 className="ff-times fw-bold">Add Book</h1>
        </Col>
        <Col className="w-80">
          <Form onSubmit={handleSubmit} className="py-5">
            <Form.Group className="form-group">
              <Form.Control
                id="input-image"
                className="input-file"
                type="file"
                name="image"
                onChange={handleChange}
                hidden
              />
              <Form.Label
                htmlFor="input-image"
                className="mb-4 p-2 border-input bg-gray rounded-3"
              >
                <span className="me-2">Attach Image</span>
                <img
                  src="/assets/icons/grey-attach-file.png"
                  alt="attach"
                  style={{ width: "15px" }}
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
                      borderRadius: "5px",
                    }}
                    className="mb-4"
                    alt="preview"
                  />
                </div>
              )}
            </Form.Group>

            <Form.Control
              className="mb-4 py-2 bg-gray border-2"
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={title}
            />

            <Form.Control
              className="mb-4 py-2 bg-gray border-2"
              type="text"
              placeholder="Publication Date"
              name="publicationDate"
              onChange={handleChange}
              value={publicationDate}
            />

            <Form.Control
              className="mb-4 py-2 bg-gray border-2"
              type="text"
              placeholder="Pages"
              name="pages"
              onChange={handleChange}
              value={pages}
            />

            <Form.Control
              className="mb-4 py-2 bg-gray border-2"
              type="text"
              placeholder="Author"
              name="author"
              onChange={handleChange}
              value={author}
            />

            <Form.Control
              className="mb-4 py-2 bg-gray border-2"
              type="text"
              placeholder="ISBN"
              name="isbn"
              onChange={handleChange}
              value={isbn}
            />

            <Form.Control
              className="mb-4 py-2 bg-gray border-2"
              as="textarea"
              placeholder="About This Book"
              name="about"
              onChange={handleChange}
              value={about}
              rows={6}
            />

            <Form.Group className="form-group">
              <Form.Control
                id="input-file"
                className="input-file"
                type="file"
                name="bookFile"
                onChange={handleChange}
                hidden
              />
              <Form.Label
                htmlFor="input-file"
                className="p-2 border-input bg-gray rounded-3"
              >
                <span className="me-2">Attach Book File</span>
                <img
                  src="/assets/icons/grey-attach-file.png"
                  alt="attach"
                  style={{ width: "15px" }}
                />
              </Form.Label>
            </Form.Group>

            <Form.Group className="d-flex justify-content-end mt-3">
              <Button
                type="submit"
                variant="danger"
                className="bg-orange py-2 ol-none rounded-3"
              >
                Add Book
                <img
                  src="/assets/icons/add-book.png"
                  alt="add-book"
                  className="ms-3"
                />
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
