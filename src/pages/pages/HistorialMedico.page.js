import { useContext, useEffect, useState } from 'react';
import request, { gql } from 'graphql-request';
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from '../../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../../realm/constants';
import * as React from 'react';
import EnhancedTable from '../../components/individual/EnhancedTable.component';
import { useNavigate } from "react-router-dom";

const HistorialMedico = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);
  const [tableRows, setTableRows] = useState([]);
  const [historialMedico, setHistorialMedico] = useState([]);
  const navigate = useNavigate();

  // GraphQL query to fetch all the historialMedico from the collection. 
  const getAllHistorialMedicoQuery = gql`
  query getAllHistorialMedico {
    historialMedicos(sortBy: CREATEDAT_DESC) {
      _id      
      title
      description
      createdAt
      vacaID
    }
  }
  `;

  // Since we don't want to filter the results as of now,
  // we will just use the empty query object
  const queryVariables = {};

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` }

  // loadHistorialMedico function is responsible for making the GraphQL
  // request to Realm and update the historialMedico array from the response. 
  const loadHistorialMedico = async () => {
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllHistorialMedicoQuery,
      queryVariables,
      headers
    );
    setHistorialMedico(_ => resp.historialMedicos.map(expense => ({ ...expense, key: expense._id, afterDelete })));
  };

  useEffect(() => {
    loadHistorialMedico();
  }, []);

  // Helper function to be performed after an expense has been deleted.
  const afterDelete = () => {
    loadHistorialMedico();
  }
  useEffect(() => {
    console.log("historialMedico", historialMedico);
    const r = historialMedico.map(vaca => createData(vaca._id, vaca.title, vaca.description, vaca.createdAt, vaca.vacaID));
    console.log("r", r);
    setTableRows(r);
  }, [historialMedico]);
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
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'createdAt',
    },
    {
      id: 'vacaID',
      numeric: false,
      disablePadding: false,
      label: 'vacaID',
    }

  ];

  const onClick = async (event) => {
    navigate(`/AddHistorialMedico`);
  };

  const onClickEdit = async (id) => {
    navigate(`/historialMedico/${id}/edit`);
  };

  return <PageContainer>
    <EnhancedTable
      onClickAdd={onClick}
      rows={tableRows}
      headers={headCells}
      title="HistorialMedico"
      afterDelete={afterDelete}
      onClickRow={onClickEdit}
    />
  </PageContainer>
}

function createData(id, title, description, createdAt, vacaID) {
  return {
    id: id,
    title: title,
    description: description,
    createdAt: createdAt,
    vacaID: vacaID,
  }
}


export default HistorialMedico;