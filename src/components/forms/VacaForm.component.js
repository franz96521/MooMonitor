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
      <h1>{editing ? "Edit Vaca" : "Create Vaca"}</h1>
      <TextField
        label="peso"
        type="number"
        variant="outlined"
        name="peso"
        value={form.peso}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />      
      <TextField
        label="raza"
        type="text"
        variant="outlined"
        name="raza"
        value={form.raza}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
        <TextField
        label="farm"
        type="text"
        variant="outlined"
        name="farm"
        value={form.farm}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
        <TextField
        label="group"
        type="number"
        variant="outlined"
        name="group"
        value={form.group}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
        <TextField
        label="numero"
        type="number"
        variant="outlined"
        name="numero"
        value={form.numero}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
      <CustomDatePicker
        label="nacimiento"
        value={form.createdAt}
        onChange={(v) => { setForm({ ...form, createdAt: v }) }}
        style={{ marginBottom: "1rem", display: "block" }}
      />
      <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
        {editing ? "Update" : "Create"} vaca
      </Button>
    </form>
  </PageContainer>;
}

export default VacaForm;