import { useContext, useEffect, useState } from 'react';
import request, { gql } from 'graphql-request';
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from '../../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../../realm/constants';
import * as React from 'react';
import EnhancedTable from '../../components/individual/EnhancedTable.component';
import { useNavigate } from "react-router-dom";

const Vacas = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);
  const [tableRows, setTableRows] = useState([]);
  const [vacas, setVacas] = useState([]);
  const navigate = useNavigate();

  // GraphQL query to fetch all the vacas from the collection. 
  const getAllVacasQuery = gql`
  query getAllVacas {
    vacas(sortBy: NUMERO_DESC) {
      _id
      peso
      raza
      farm
      group
      numero
      nacimiento
    }
  }
  `;

  // Since we don't want to filter the results as of now,
  // we will just use the empty query object
  const queryVariables = {};

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` }

  // loadVacas function is responsible for making the GraphQL
  // request to Realm and update the vacas array from the response. 
  const loadVacas = async () => {
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllVacasQuery,
      queryVariables,
      headers
    );
    setVacas(_ => resp.vacas.map(expense => ({ ...expense, key: expense._id, afterDelete })));
  };

  useEffect(() => {
    loadVacas();
  }, []);

  // Helper function to be performed after an expense has been deleted.
  const afterDelete = () => {
    loadVacas();
  }
  useEffect(() => {
    const r = vacas.map(vaca => createData(vaca._id, vaca.numero, vaca.peso, vaca.raza, vaca.farm, vaca.group, vaca.nacimiento));
    // const r2 = [createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Donut', 452, 25.0, 51, 4.9),]
    setTableRows(r);
  }, [vacas]);
  useEffect(() => {
    console.log("rows");
    console.log(tableRows);
  }, [tableRows]);

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Id',
    }, {
      id: 'numero',
      numeric: true,
      disablePadding: false,
      label: 'numero',
    },
    {
      id: 'peso',
      numeric: true,
      disablePadding: false,
      label: 'peso',
    },
    {
      id: 'raza',
      numeric: false,
      disablePadding: false,
      label: 'Raza',
    },
    {
      id: 'farm',
      numeric: true,
      disablePadding: false,
      label: 'farm',
    },
    {
      id: 'group',
      numeric: false,
      disablePadding: false,
      label: 'group',
    },
    {
      id: 'nacimiento',
      numeric: false,
      disablePadding: false,
      label: 'nacimiento',
    }
  ];

  const onClickAdd = async (event) => {
    navigate(`/AddVaca`);
  }
  const onClickEdit = async (id) => {

    navigate(`/vaca/${id}/edit`);

  };


  return <PageContainer>
    <EnhancedTable
      onClickAdd={onClickAdd}
      rows={tableRows}
      headers={headCells}
      title="Vacas"
      afterDelete={afterDelete}
      onClickRow={onClickEdit}
    />
  </PageContainer>
}

function createData(id, numero, peso, raza, farm, group, nacimiento) {
  return {
    id: id,
    numero: numero,
    peso: peso,
    raza: raza,
    farm: farm,
    group: group,
    nacimiento: nacimiento,
  }
}


export default Vacas;