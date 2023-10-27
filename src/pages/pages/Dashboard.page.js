import { useContext, useEffect, useState } from 'react';
import request, { gql } from 'graphql-request';
import PageContainer from "../../components/individual/PageContainer.component";
import { UserContext } from '../../contexts/user.context';
import { GRAPHQL_ENDPOINT } from '../../realm/constants';
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import notifyMe from '../../components/individual/notifications.component';

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


const Dashboard = () => {
  // Fetching user details from UserContext
  const { user } = useContext(UserContext);

  // const [vacas, setExpenses] = useState([]);
  const [resp, setResp] = useState([]);
  const [data, setData] = useState(undefined);

  // GraphQL query to fetch all the vacas from the collection. 
  const getAllExpensesQuery = gql`
  query getAllVacas {
    vacas(sortBy: NUMERO_DESC) {
      _id
      peso
      raza
      farm
      group
      numero
      nacimiento
    }
    calendarios(sortBy: FECHA_DESC) {
      _id
      title 
      description
      fecha
    }
    farms(sortBy: UBICACION_DESC) {
      _id
      ubicacion
      nombre
    }
    historialMedicos(sortBy: CREATEDAT_DESC) {
      _id      
      title
      description
      createdAt
      vacaID
    }
  }
  `;

  // Since we don't want to filter the results as of now,
  // we will just use the empty query object
  const queryVariables = {};

  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` }

  // loadExpenses function is responsible for making the GraphQL
  // request to Realm and update the vacas array from the response. 
  const loadExpenses = async () => {
    const resp = await request(GRAPHQL_ENDPOINT,
      getAllExpensesQuery,
      queryVariables,
      headers
    );
    setResp(resp);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Helper function to be performed after an vaca has been deleted.
  const afterDelete = () => {
    loadExpenses();
  }

  useEffect(() => {
    const chartdata = {
      farmData: undefined,
      calendarioData: undefined,
      historialMedicoData: undefined,
      vacaData: undefined,
    }
    // console.log("resp", resp);
    if (resp.vacas === undefined || resp.calendarios === undefined || resp.historialMedicos === undefined || resp.farms === undefined) return;
    if (resp.farms) {
      const farms = resp.farms.map(farm => ({ ...farm, key: farm._id, afterDelete }))



      chartdata.farmData = farms;

    }
    if (resp.vacas) {
      const vacas = resp.vacas.map(vaca => ({ ...vaca, key: vaca._id, afterDelete }))

      // data farm
      const dictionary = {};
      vacas.forEach(vaca => {
        const x = chartdata.farmData.find(farm => farm._id === vaca?.farm)?.nombre || "unknown";

        if (dictionary[x]) {
          dictionary[x] += 1;
        } else {
          dictionary[x] = 1;
        }
      });
      const colors = Object.keys(dictionary).map(() => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      });
      console.log("colors", colors);
      chartdata.vacaData = {
        labels: Object.keys(dictionary),
        datasets: [
          {
            label: '# of Vacas',
            data: Object.values(dictionary),
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      }
    }

    if (resp.calendarios) {
      // get next 3 events  sorted by fecha 
      const calendarios = resp.calendarios.map(calendario => ({ ...calendario, key: calendario._id, afterDelete }))
      calendarios.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        return dateB - dateA;
      });
      // obtener los eventos de los proximos 3 dias
      const today = new Date();
      const tomorrow = new Date(today);

      tomorrow.setDate(tomorrow.getDate() + 3);
      const next3Days = calendarios.filter(calendario => {
        const date = new Date(calendario.fecha);
        return date >= today && date <= tomorrow;
      });

      // send alert if event is today
      const todayEvents = calendarios.filter(calendario => {
        const date = new Date(calendario.fecha);
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      });
      todayEvents.forEach(event => {
        notifyMe(event.title, event.description);
      });
      chartdata.calendarioData = {
        calendarios: calendarios.slice(0, 4),
      }
    }
    setData(chartdata);
  }, [resp]);

  return <PageContainer>
    <h1>General Data</h1>
    <section class="py-3 py-md-5 py-xl-8">
      <div class="container">
        <div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
          <div class="col-12 col-lg-6 col-xl-5">
            <h2> Next Events </h2>
            {data && data.calendarioData ? data.calendarioData.calendarios.map(calendario =>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {calendario.fecha}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {calendario.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {calendario.description}
                  </Typography>
                </CardContent>
              </Card>) : null}
          </div>
          <div class="col-12 col-lg-6 col-xl-5">
            <h2> Vacas por Farm</h2>
            {data ? <PolarArea data={data.vacaData} /> : null}
          </div>

        </div>

      </div>

      <div class="container">
        <h2> Farms por Ubicacion</h2>
        {data && data.farmData ? data.farmData.map(farm =>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {farm.nombre}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {farm.ubicacion} - {farm._id}
              </Typography>
            </CardContent>
          </Card>) : null}
      </div>
    </section>






  </PageContainer>
}

export default Dashboard;

