import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function CardStock() {
  return (
    <div className="m-4">
      <Card className="container">
        <Card.Body>
          <Card.Title className="text-center text-white bg-dark">
            Control de Stock
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">asdasdasd</Card.Subtitle>
          <Card.Text>
            <Table striped bordered hover variant="white text-center">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Categoria</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>as</td>
                  <td>as</td>
                </tr>
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardStock;
