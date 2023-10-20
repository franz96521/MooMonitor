import { Button, TextField } from "@mui/material";
import PageContainer from "../individual/PageContainer.component";

const FarmForm = ({ onSubmit, form, setForm, editing }) => {
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return <PageContainer>
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>{editing ? "Edit Farm" : "Create Farm"}</h1>      
      <TextField
        label="nombre"
        type="text"
        variant="outlined"
        name="nombre"
        value={form.nombre}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
        <TextField
        label="ubicacion"
        type="text"
        variant="outlined"
        name="ubicacion"
        value={form.ubicacion}
        onChange={onFormInputChange}
        fullWidth
        style={{ marginBottom: "1rem" }} />
        
      <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
        {editing ? "Update" : "Create"} Farm
      </Button>
    </form>
  </PageContainer>;
}

export default FarmForm;