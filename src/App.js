import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Analytics from "./pages/pages/Analytics.page";
import CreateExpense from "./pages/add/CreateExpense.page";
import EditExpense from "./pages/edit/EditExpense.page";
import Home from "./pages/pages/Home.page";
import Login from "./pages/login/Login.page";
import PrivateRoute from "./pages/routes/PrivateRoute.page";
import Signup from "./pages/login/Signup.page";
import PublicRoute from "./pages/routes/PublicRoute.page";
import Dashboard from "./pages/pages/Dashboard.page";
import AddVaca from "./pages/add/AddVaca.page";
import AddFarm from "./pages/add/AddFarm.page";
import AddHistorialMedico from "./pages/add/AddHistorialMedico.page";
import AddCalendario from "./pages/add/AddEvent.page";
import Vacas from "./pages/pages/Vacas.page";
import HistorialMedico from "./pages/pages/HistorialMedico.page";
import Farms from "./pages/pages/Farms.page";
import Calendario from "./pages/pages/Calendario.page";
import EditVaca from "./pages/edit/EditVaca.page";
import EditCalendario from "./pages/edit/EditCalendario.page";
import EditHistorialMedico from "./pages/edit/EditHistorialMedico.page";
import EditFarm from "./pages/edit/EditFarm.page";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/new" element={<CreateExpense />} />

            <Route exact path="/AddVaca" element={<AddVaca />} />
            <Route exact path="/AddFarm" element={<AddFarm />} />
            <Route exact path="/AddHistorialMedico" element={<AddHistorialMedico />} />
            <Route exact path="/AddCalendario" element={<AddCalendario />} />

            <Route exact path="/Vacas" element={<Vacas />} />
            <Route exact path="/Farms" element={<Farms />} />
            <Route exact path="/HistorialMedico" element={<HistorialMedico />} />
            <Route exact path="/Calendario" element={<Calendario />} />


            <Route exact path="/expense/:id/edit" element={<EditExpense />} />
            <Route exact path="/vaca/:id/edit" element={<EditVaca />} />
            <Route exact path="/calendario/:id/edit" element={<EditCalendario />} />
            <Route exact path="/historialMedico/:id/edit" element={<EditHistorialMedico />} />
            <Route exact path="/farm/:id/edit" element={<EditFarm />} />

            <Route exact path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
