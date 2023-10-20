import { useContext, useEffect, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import CalendarioForm from "../../components/forms/CalendarioForm.component";
import { useParams, useNavigate } from "react-router-dom";

const EditCalendario = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fecha: "",
  });

  const { id: calendarioId } = useParams();
  const navigate = useNavigate();

  const loadCalendario = async () => {
    // GraphQL query to fetch the details of an calendario
    // using calendarioId
    const getCalendarioQuery = gql`
      query getCalendario($query: CalendarioQueryInput!) {
        calendario(query: $query) {
          _id
          title 
          description
          fecha
        }
      }
      `;

    const queryVariables = { query: { _id: calendarioId } }

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const resp = await request(GRAPHQL_ENDPOINT, getCalendarioQuery, queryVariables, headers);

    // Destructuring the values of the calendario fetched
    // and auto-filling it into the form.
    const { title, description, fecha } = resp.calendario;
    setForm({
      title,
      description,
      fecha
    });
  };

  useEffect(() => {
    loadCalendario(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, description, fecha } = form;
    
    // Checking if values are empty before submitting.
    if (title.length === 0 || description.length === 0 || fecha.length === 0) {
      return;
    }
    
    // GraphQL mutation to edit the details of an calendario
    const editCalendarioMutation = gql`
    mutation EditCalendario($query: CalendarioQueryInput!, $set: CalendarioUpdateInput!) {
      updateOneCalendario(query: $query, set: $set) {
        _id
      }
    }
    `;

    // Here, we will be including all the keys and their respective values needed
    // to fetch the exact calendario and update it accordingly with
    // newly inputted values.
    const queryAndUpdateVariables = {
      query: {
        _id: calendarioId
      },
      set: {
        title,
        description,
        fecha
      },
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
      await request(GRAPHQL_ENDPOINT, editCalendarioMutation, queryAndUpdateVariables, headers);

      // Navigating to homepage once the updates are sent and confirmed.
      navigate(`/Calendario`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <CalendarioForm onSubmit={onSubmit} form={form} setForm={setForm} editing />
  </PageContainer>
}

export default EditCalendario;