import { useContext, useEffect, useState } from 'react';
import request, { gql } from 'graphql-request';
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from '../../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../../realm/constants';
import * as React from 'react';
import EnhancedTable from '../../components/individual/EnhancedTable.component';
import { useNavigate } from "react-router-dom";

const Groups = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);
  const [tableRows, setTableRows] = useState([]);
  const [calendario, setFarm] = useState([]);
  const navigate = useNavigate();


  // GraphQL query to fetch all the calendario from the collection. 
  const getAllFarmQuery = gql`
  query getAllCalendario {
    calendarios(sortBy: FECHA_DESC) {
      _id
      title 
      description
      fecha
    }
  }
  `;

  // Since we don't want to filter the results as of now,
  // we will just use the empty query object
  const queryVariables = {};

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` }

  // loadFarm function is responsible for making the GraphQL
  // request to Realm and update the calendario array from the response. 
  const loadFarm = async () => {
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllFarmQuery,
      queryVariables,
      headers
    );

    setFarm(_ => resp.calendarios.map(expense => ({ ...expense, key: expense._id, afterDelete })));
  };

  useEffect(() => {
    loadFarm();
  }, []);

  // Helper function to be performed after an expense has been deleted.
  const afterDelete = () => {
    loadFarm();
  }
  useEffect(() => {
    const r = calendario.map(calendario => createData(calendario._id, calendario.title, calendario.description, calendario.fecha, calendario.author));
    // const r2 = [createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Donut', 452, 25.0, 51, 4.9),]
    setTableRows(r);
  }, [calendario]);

  const headCells = [
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: 'title',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'description',
    },
    {
      id: 'fecha',
      numeric: false,
      disablePadding: false,
      label: 'fecha',
    }, {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Id',
    },

  ];
  const onClick = async (event) => {
    navigate(`/AddCalendario`);
  };
  const onClickEdit = async (id) => {

    navigate(`/calendario/${id}/edit`);

  };


  return <PageContainer>
    <EnhancedTable
      onClickAdd={onClick}
      rows={tableRows}
      headers={headCells}
      title="Calendario"
      afterDelete={afterDelete}
      onClickRow={onClickEdit}
    />
  </PageContainer>
}

export function createData(id, title, description, fecha) {
  return {
    id: id,
    title: title,
    description: description,
    fecha: fecha,
  };
}


export default Groups;