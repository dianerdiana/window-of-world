import { Dropdown } from "react-bootstrap"

export default function ActionsTable() {

  

  return(
    <>
      <Dropdown className="dropdown-action">
        <Dropdown.Toggle className="dropdown-toggle-action" variant="link">
          <img src="/assets/icons/polygon.png"/>
        </Dropdown.Toggle>

        <Dropdown.Menu align="right" variant="dark" className="dropdown-action-menu">
          <div className="triangle"></div>
          <Dropdown.Item as="button">Approve</Dropdown.Item>
          <Dropdown.Item as="button">Cancel</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}