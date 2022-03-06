import { Modal } from "react-bootstrap";

export default function Unsubscribed(props) {

  return(
    <Modal
      {...props}
      size="lg"
      contentClassName="modal-pop"
      dialogClassName="dialog-pop"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="py-4">
        <div className="text-center w-80 ms-auto me-auto fs-5 fc-red">
          please make a payment to read the latest books
        </div>
      </Modal.Body>
    </Modal>
  )
}