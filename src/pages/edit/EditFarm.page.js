import { useContext, useEffect, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import FarmForm from "../../components/forms/FarmForm.component";
import { useParams, useNavigate } from "react-router-dom";

const EditFarm = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    nombre: "",
    ubicacion: "",
    author: ""
  });

  const { id: farmId } = useParams();
  const navigate = useNavigate();

  const loadFarm = async () => {
    // GraphQL query to fetch the details of an farm
    // using farmId
    const getFarmQuery = gql`
      query getFarm($query: FarmQueryInput!) {
        farm(query: $query) {
          _id
          nombre
          ubicacion
          author
        }
      }
      `;

    const queryVariables = { query: { _id: farmId } }

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const resp = await request(GRAPHQL_ENDPOINT, getFarmQuery, queryVariables, headers);

    // Destructuring the values of the farm fetched
    // and auto-filling it into the form.
    const { nombre, ubicacion, author } = resp.farm;
    setForm({
      nombre,
      ubicacion,
      author
    });
  };

  useEffect(() => {
    loadFarm(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { nombre, ubicacion, author } = form;

    // Checking if values are empty before submitting.
    if (nombre.length === 0 || ubicacion.length === 0 || author.length === 0) {
      return;
    }

    // GraphQL mutation to edit the details of an farm
    const editFarmMutation = gql`
    mutation EditFarm($query: FarmQueryInput!, $set: FarmUpdateInput!) {
      updateOneFarm(query: $query, set: $set) {
        _id
      }
    }
    `;

    // Here, we will be including all the keys and their respective values needed
    // to fetch the exact farm and update it accordingly with
    // newly inputted values.
    const queryAndUpdateVariables = {
      query: {
        _id: farmId
      },
      set: {
        nombre,
        ubicacion,
        author
      },
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
      await request(GRAPHQL_ENDPOINT, editFarmMutation, queryAndUpdateVariables, headers);

      // Navigating to homepage once the updates are sent and confirmed.
      navigate(`/Farms`);
    } catch (error) {
      alert(error)
    }
  };

  return <PageContainer>
    <FarmForm onSubmit={onSubmit} form={form} setForm={setForm} editing />
  </PageContainer>
}

export default EditFarm;