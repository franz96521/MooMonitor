import { useContext, useState } from "react";
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../realm/constants";
import HistorialMedicoForm from "../../components/forms/HistorialMedicoForm.component";
import { useNavigate } from "react-router-dom";

const AddHistorialMedico = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // Some prefilled form state
    const [form, setForm] = useState({
        title: "",
        description: "",
        author: user.id,
        vacaID: "",
        createdAt: new Date()
    });

    // GraphQL query to create an historialMedico
    const addHistorialMedicoQuery = gql`
  mutation AddHistorialMedico($data: HistorialMedicoInsertInput!) {
    insertOneHistorialMedico(data: $data) {
      _id
    }
  }
  `;

    // All the data that needs to be sent to the GraphQL endpoint
    // to create an historialMedico will be passed through queryVariables.
    const queryVariables = {
        data: {
            title: form.title,
            description: form.description,
            createdAt: form.createdAt,
            author: user.id,
            vacaID: form.vacaID
        }
    };

    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { title, description, createdAt, author } = form;
        if (title.length === 0 || description.length === 0 || createdAt.length === 0 || author.length === 0) {
            return;
        }
        try {
            await request(GRAPHQL_ENDPOINT, addHistorialMedicoQuery, queryVariables, headers);

            // Navigate to the Home page after creating an historialMedico
            navigate(`/Dashboard`);
        } catch (error) {
            alert(error)
        }
    };

    return <PageContainer>
        <HistorialMedicoForm onSubmit={onSubmit} form={form} setForm={setForm} title="Create HistorialMedico" />
    </PageContainer>
}

export default AddHistorialMedico;