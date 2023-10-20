import { Button, TextField } from "@mui/material";
import CustomDatePicker from "../individual/CustomDatePicker.component";
import PageContainer from "../individual/PageContainer.component";

const ExpenseForm = ({ onSubmit, form, setForm, editing }) => {
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return <PageContainer>
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>{editing ? "Edit evento" : "Create Event"}</h1>
      <TextField
        label="Title"
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
      <CustomDatePicker
        label="fecha"
        value={form.fecha}
        onChange={(v) => { setForm({ ...form, fecha: v }) }}
        style={{ marginBottom: "1rem", display: "block" }}
      />
      <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
        {editing ? "Update" : "Create"} Evento
      </Button>
    </form>
  </PageContainer>;
}

export default ExpenseForm;