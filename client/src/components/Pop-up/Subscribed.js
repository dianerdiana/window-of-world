import { Modal } from "react-bootstrap";

export default function Subscribed(props) {

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
        <div className="text-center w-80 ms-auto me-auto fs-5 fc-green">
          Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you
        </div>
      </Modal.Body>
    </Modal>
  )
}