import { useContext, useEffect, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import VacaForm from "../../components/forms/VacaForm.component";
import { useParams, useNavigate } from "react-router-dom";

const EditVaca = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    peso: "",
    raza: "",
    farm: "",
    group: "",
    numero: "",
    nacimiento: new Date()
  });

  const { id: vacaId } = useParams();
  const navigate = useNavigate();

  const loadVaca = async () => {
    // GraphQL query to fetch the details of an vaca
    // using vacaId
    const getVacaQuery = gql`
      query getVaca($query: VacaQueryInput!) {
        vaca(query: $query) {
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

    const queryVariables = { query: { _id: vacaId } }

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const resp = await request(GRAPHQL_ENDPOINT, getVacaQuery, queryVariables, headers);

    // Destructuring the values of the vaca fetched
    // and auto-filling it into the form.
    const { peso, raza, farm, group, numero, nacimiento } = resp.vaca;
    setForm({
      peso,
      raza,
      farm,
      group,
      numero,
      nacimiento
    });
  };

  useEffect(() => {
    loadVaca(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { peso, raza, farm, group, numero, nacimiento } = form;

    // Checking if values are empty before submitting.
    if (peso.length === 0 || raza.length === 0 || farm.length === 0 || group.length === 0 || numero.length === 0 || nacimiento.length === 0) {
      return;
    }

    // GraphQL mutation to edit the details of an vaca
    const editVacaMutation = gql`
    mutation EditVaca($query: VacaQueryInput!, $set: VacaUpdateInput!) {
      updateOneVaca(query: $query, set: $set) {
        _id
      }
    }
    `;

    // Here, we will be including all the keys and their respective values needed
    // to fetch the exact vaca and update it accordingly with
    // newly inputted values.
    const queryAndUpdateVariables = {
      query: {
        _id: vacaId
      },
      set: {
        peso: peso,
        raza: raza,
        farm: farm,
        group: group,
        numero: numero,
        nacimiento: nacimiento
      },
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
      await request(GRAPHQL_ENDPOINT, editVacaMutation, queryAndUpdateVariables, headers);

      // Navigating to homepage once the updates are sent and confirmed.
      navigate(`/Vacas`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <VacaForm onSubmit={onSubmit} form={form} setForm={setForm} editing />
  </PageContainer>
}

export default EditVaca;