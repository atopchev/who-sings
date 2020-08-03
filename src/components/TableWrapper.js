import React from 'react';
import Table from "react-bootstrap/Table";

const TableWrapper = ({ rowData, collumn = "Date" }) => {
	return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>{collumn}</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>{rowData}</tbody>
    </Table>
  );
};

export default TableWrapper;
