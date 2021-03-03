import React from "react";
import Table from "react-bootstrap/Table";

function InteractionList(interactions) {
  let interactionsObj = interactions.interactions;

  if (interactionsObj.noneFound) {
    return <p>{interactionsObj.noneFound}</p>;
  }
  let interactionsTable = [];
  Object.entries(interactionsObj).forEach(([key, value]) => {
    interactionsTable.push(
      <tr key={key}>
        <td>{value.name1}</td>
        <td>{value.name2}</td>
        <td>{value.description}</td>
        <td>{value.severity}</td>
        <td>{value.comment}</td>
      </tr>
    );
  });
  return (
    <div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>drug 1</th>
            <th>drug 2</th>
            <th>description</th>
            <th>severity</th>
            <th>comment</th>
          </tr>
        </thead>
        <tbody>{interactionsTable}</tbody>
      </Table>
    </div>
  );
}

export default InteractionList;
