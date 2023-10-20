import { useContext, useEffect, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import HistorialMedicoForm from "../../components/forms/HistorialMedicoForm.component";
import { useParams, useNavigate } from "react-router-dom";

const EditHistorialMedico = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: user.id,
    vacaID: "",
    createdAt: new Date()
  });

  const { id: historialMedicoId } = useParams();
  const navigate = useNavigate();

  const loadHistorialMedico = async () => {
    // GraphQL query to fetch the details of an historialMedico
    // using historialMedicoId
    const getHistorialMedicoQuery = gql`
      query getHistorialMedico($query: HistorialMedicoQueryInput!) {
        historialMedico(query: $query) {
          _id
          title
          description
          author
          vacaID
          createdAt
        }
      }
      `;

    const queryVariables = { query: { _id: historialMedicoId } }

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const resp = await request(GRAPHQL_ENDPOINT, getHistorialMedicoQuery, queryVariables, headers);

    // Destructuring the values of the historialMedico fetched
    // and auto-filling it into the form.
    const { title, description, vacaID, createdAt } = resp.historialMedico;
    setForm({
      title,
      description,
      vacaID,
      createdAt
    });
  };

  useEffect(() => {
    loadHistorialMedico(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, description, vacaID, createdAt } = form;

    // Checking if values are empty before submitting.
    if (title.length === 0 || description.length === 0 || vacaID.length === 0 || createdAt.length === 0) {
      return;
    }

    // GraphQL mutation to edit the details of an historialMedico
    const editHistorialMedicoMutation = gql`
    mutation EditHistorialMedico($query: HistorialMedicoQueryInput!, $set: HistorialMedicoUpdateInput!) {
      updateOneHistorialMedico(query: $query, set: $set) {
        _id
      }
    }
    `;

    // Here, we will be including all the keys and their respective values needed
    // to fetch the exact historialMedico and update it accordingly with
    // newly inputted values.
    const queryAndUpdateVariables = {
      query: {
        _id: historialMedicoId
      },
      set: {
        title,
        description,
        vacaID,
        createdAt
      },
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
      await request(GRAPHQL_ENDPOINT, editHistorialMedicoMutation, queryAndUpdateVariables, headers);

      // Navigating to homepage once the updates are sent and confirmed.
      navigate(`/HistorialMedico`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <HistorialMedicoForm onSubmit={onSubmit} form={form} setForm={setForm} editing />
  </PageContainer>
}

export default EditHistorialMedico;