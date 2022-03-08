import { Dropdown } from "react-bootstrap"

export default function ActionsTable() {

  

  return(
    <>
      <Dropdown className="dropdown-action">
        <Dropdown.Toggle className="dropdown-toggle-action" variant="link">
          <img src="/assets/icons/triangle.png" alt="triangle"/>
        </Dropdown.Toggle>

        <Dropdown.Menu aria-setsize={100} align="end" className="dropdown-action-menu dropdown-menu-start ol-none">
          <div className="triangle-action"></div>
          <Dropdown.Item as="button" className="Active fw-bold action-item">Approve</Dropdown.Item>
          <Dropdown.Item as="button" className="fc-red fw-bold action-item">Cancel</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}