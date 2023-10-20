import { Button, TextField } from "@mui/material";
import CustomDatePicker from "../individual/CustomDatePicker.component";
import PageContainer from "../individual/PageContainer.component";

const VacaForm = ({ onSubmit, form, setForm, editing }) => {
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return <PageContainer>
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>{editing ? "Edit Historial" : "Create Historial"}</h1>
      <TextField
        label="title"
        type="text"
        variant="outlined"
        name="title"
        value={form.title}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="description"
        type="text"
        variant="outlined"
        name="description"
        value={form.description}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <TextField
        label="Vaca ID"
        type="text"
        variant="outlined"
        name="vacaID"
        value={form.vacaID}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <CustomDatePicker
        label="createdAt"
        value={form.createdAt}
        onChange={(v) => { setForm({ ...form, createdAt: v }) }}
        style={{ marginBottom: "1rem", display: "block" }}
      />
      <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
        {editing ? "Update" : "Create"} Historial Medico
      </Button>
    </form>
  </PageContainer>;
}

export default VacaForm;