import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

//import component
import ActionsTable from "../components/ActionsTable";
import NavAdmin from "../components/navbar/NavAdmin";

//import data
import { API } from "../config/api";

export default function ListTransaction() {
  const title = "List Transactions";
  document.title = "WOW | " + title;

  const [dataTransactions, setDataTransactions] = useState([]);

  const getTransactions = async () => {
    const response = await API.get("/transactions");

    setDataTransactions(response.data.data.transactions);
  };

  const approveTransactions = async (id) => {
    const response = await API.patch("/transaction/" + id);

    getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <Container fluid className="pb-5">
      <Row className="py-2">
        <NavAdmin />
      </Row>
      <Row className="flex-column align-items-center mt-5">
        <Col className="w-80 mb-5">
          <h3 className="ff-times fw-bold">Incoming Transaction</h3>
        </Col>
        <Col className="w-80 pb-5">
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
              {dataTransactions?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}.</td>
                    <td>{item.purchaser.fullName}</td>
                    <td>{item.transferProof}</td>
                    <td>{item.remainingActive} / Hari</td>
                    <td className={item.user_status}>{item.user_status}</td>
                    <td className={item.payment_status}>
                      {item.payment_status}
                    </td>
                    <td>
                      <ActionsTable
                        approve={() => approveTransactions(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
