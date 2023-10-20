import { useContext, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import VacaForm from "../../components/forms/VacaForm.component";
import { useNavigate } from "react-router-dom";

const AddVaca = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Some prefilled form state
  const [form, setForm] = useState({
    peso: "",
    raza: "",
    farm: "",
    group: "",
    numero: "",
    author: user.id,
    createdAt: new Date()
  });

  // GraphQL query to create an vaca
  const addVacaQuery = gql`
  mutation AddVaca($data: VacaInsertInput!) {
    insertOneVaca(data: $data) {
      _id
    }
  }
  `;

  // All the data that needs to be sent to the GraphQL endpoint
  // to create an vaca will be passed through queryVariables.
  const queryVariables = {
    data: {
      peso: form.peso,
      raza: form.raza,
      farm: form.farm,
      group: form.group,
      author: user.id,
      numero: parseInt(form.numero),
      nacimiento: form.createdAt
    }
  };

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { peso, raza, farm, group, numero, author} = form;
    if (peso.length === 0 || raza.length === 0 || farm.length === 0 || group.length === 0 || numero.length === 0 || author.length === 0) {
      return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, addVacaQuery, queryVariables, headers);

      // Navigate to the Home page after creating an vaca
      navigate(`/Dashboard`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <VacaForm onSubmit={onSubmit} form={form} setForm={setForm} title="Create Vaca" />
  </PageContainer>
}

export default AddVaca;