import { useContext, useEffect, useState } from 'react';
import request, { gql } from 'graphql-request';
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from '../../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../../realm/constants';
import * as React from 'react';
import EnhancedTable from '../../components/individual/EnhancedTable.component';
import { useNavigate } from "react-router-dom";

const Farm = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);
  const [tableRows, setTableRows] = useState([]);
  const [farm, setFarm] = useState([]);
  const navigate = useNavigate();

  // GraphQL query to fetch all the farm from the collection. 
  const getAllFarmQuery = gql`
  query getAllFarms {
    farms(sortBy: UBICACION_DESC) {
      _id
      ubicacion
      nombre
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
  // request to Realm and update the farm array from the response. 
  const loadFarm = async () => {
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllFarmQuery,
      queryVariables,
      headers
    );
    console.log("resp");
    console.log(resp.farms);
    setFarm(_ => resp.farms.map(expense => ({ ...expense, key: expense._id, afterDelete })));
  };

  useEffect(() => {
    loadFarm();
  }, []);

  // Helper function to be performed after an expense has been deleted.
  const afterDelete = () => {
    loadFarm();
  }
  useEffect(() => {
    const r = farm.map(farm => createData(farm.nombre, farm.ubicacion, farm._id));
    // const r2 = [createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Donut', 452, 25.0, 51, 4.9),]
    setTableRows(r);
  }, [farm]);

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Id',
    }, {
      id: 'nombre',
      numeric: true,
      disablePadding: false,
      label: 'nombre',
    },
    {
      id: 'ubicacion',
      numeric: true,
      disablePadding: false,
      label: 'ubicacion',
    },

  ];

  const onClickAdd = async (event) => {

    navigate(`/AddFarm`);

  };

  const onClickEdit = async (id) => {

    navigate(`/Farm/${id}/edit`);

  };

  return <PageContainer>
    <EnhancedTable
      onClickAdd={onClickAdd}
      rows={tableRows}
      headers={headCells}
      title="Farm"
      afterDelete={afterDelete}
      onClickRow={onClickEdit}
    />
  </PageContainer>
}

function createData(nombre, ubicacion, id) {
  return {
    id: id,
    nombre: nombre,
    ubicacion: ubicacion,
  };
}


export default Farm;