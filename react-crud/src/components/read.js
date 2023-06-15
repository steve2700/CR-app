import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import axios from 'axios';

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get('https://648a4a675fa58521cab1115b.mockapi.io/crud/stewartfake')
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteEntry = (id) => {
    axios.delete(`https://648a4a675fa58521cab1115b.mockapi.io/crud/stewartfake/${id}`)
      .then((response) => {
        // Perform any necessary actions after successful deletion
        console.log('Entry deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>{data.firstName}</Table.Cell>
              <Table.Cell>{data.lastName}</Table.Cell>
              <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
              <Table.Cell>
                <Link to={`/update/${data.id}`}>
                  <Button>Update</Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
