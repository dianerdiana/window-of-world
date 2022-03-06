import { Container, Row, Col } from "react-bootstrap";

//import component
import ActionsTable from "../components/ActionsTable";
import NavAdmin from "../components/navbar/NavAdmin";

//import data
import { dataTransactions } from "../fake-data/data-transactions";

export default function ListTransaction() {

  return (
    <Container fluid>
      <Row className="py-2">
        <NavAdmin />
      </Row>
      <Row className="flex-column align-items-center mt-5">
        <Col className="w-80 mb-5">
          <h3 className="ff-times fw-bold">
            Incoming Transaction
          </h3>
        </Col>
        <Col className="w-80">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Users</th>
                <th>Bukti Transfer</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataTransactions?.map((item, index)=> {
                return(
                  <tr key={item.id}>
                    <td>{index + 1}.</td>
                    <td>{item.fullName}</td>
                    <td>{item.buktiTransfer}</td>
                    <td>{item.remainingActive}</td>
                    <td className={item.statusUser}>{item.statusUser}</td>
                    <td className={item.statusPayment}>{item.statusPayment}</td>
                    <td>
                      <ActionsTable />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  )
}