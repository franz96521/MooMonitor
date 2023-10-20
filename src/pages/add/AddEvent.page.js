import { useContext, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import CalendarioForm from "../../components/forms/CalendarioForm.component";
import { useNavigate } from "react-router-dom";

const AddCalendario = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Some prefilled form state
  const [form, setForm] = useState({
    title: "",
    description:"",
    author: user.id,
    fecha: new Date()
  });

  // GraphQL query to create an calendario
  const addCalendarioQuery = gql`
  mutation AddCalendario($data: CalendarioInsertInput!) {
    insertOneCalendario(data: $data) {
      _id
    }
  }
  `;

  // All the data that needs to be sent to the GraphQL endpoint
  // to create an calendario will be passed through queryVariables.
  const queryVariables = {
    data: {
      title: form.title,
      description: form.description,
      fecha: form.fecha,
      author: user.id,
    }
  };

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { title,description,fecha,author} = form;
    if (title.length === 0 || description.length === 0 || fecha.length === 0 || author.length === 0) {
      return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, addCalendarioQuery, queryVariables, headers);

      // Navigate to the Home page after creating an calendario
      navigate(`/Dashboard`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <CalendarioForm onSubmit={onSubmit} form={form} setForm={setForm} title="Create Calendario" />
  </PageContainer>
}

export default AddCalendario;