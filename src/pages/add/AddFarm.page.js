import { useContext, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import FarmForm from "../../components/forms/FarmForm.component";
import { useNavigate } from "react-router-dom";

const AddFarm = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // Some prefilled form state
    const [form, setForm] = useState({
        nombre: "",
        ubicacion: "",
        author: user.id
    });

    // GraphQL query to create an farm
    const addFarmQuery = gql`
  mutation AddFarm($data: FarmInsertInput!) {
    insertOneFarm(data: $data) {
      _id
    }
  }
  `;

    // All the data that needs to be sent to the GraphQL endpoint
    // to create an farm will be passed through queryVariables.
    const queryVariables = {
        data: {
            nombre: form.nombre,
            ubicacion: form.ubicacion,
            author: user.id,
        }
    };

    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { nombre, ubicacion, author } = form;
        if (nombre.length === 0 || ubicacion.length === 0 || author.length === 0 ) {
            return;
        }
        try {
            await request(GRAPHQL_ENDPOINT, addFarmQuery, queryVariables, headers);

            // Navigate to the Home page after creating an farm
            navigate(`/Dashboard`);
        } catch (error) {
            alert(error)
        }
    };

    return <PageContainer>
        <FarmForm onSubmit={onSubmit} form={form} setForm={setForm} title="Create Farm" />
    </PageContainer>
}

export default AddFarm;