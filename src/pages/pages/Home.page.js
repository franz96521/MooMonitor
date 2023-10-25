import MainCards from "../../components/individual/MainCards.component";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  const images = [
    {
      url: "https://cdn.pixabay.com/photo/2022/02/04/10/31/cow-6992475_1280.jpg",
      title: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      url: "https://cdn.pixabay.com/photo/2016/08/06/19/23/highland-cow-1575005_1280.jpg",
      title: "Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

    },
  ]
  return (<>

    <DarkVariantExample images={images} />
    <AboutProduct />
    <MainCards />

  </>
  );
};


function DarkVariantExample(props) {
  const { images } = props;
  return (
    <Carousel data-bs-theme="dark">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image.url}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>{image.title}</h5>
            <p>
              {image.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function AboutProduct() {
  return (
    <section class="py-3 py-md-5 py-xl-8">
      <div class="container">
        <div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
          <div class="col-12 col-lg-6 col-xl-5">
            <img class="img-fluid rounded" loading="lazy" src="https://igualdadanimal.mx/app/uploads/2020/07/blog-vacas-maltrato-animal-crueldad-2-mx.jpg" alt="" />
          </div>
          <div class="col-12 col-lg-6 col-xl-7">
            <div class="row justify-content-xl-center">
              <div class="col-12 col-xl-11">
                <h2 class="h1 mb-3">Acerca de Moomonitor</h2>
                <p class="lead fs-4 text-secondary mb-3">En Moomonitor, estamos comprometidos con la transformación de la industria
                  ganadera a través de la innovación y la tecnología. Nuestra pasión por el bienestar
                  animal y el éxito de los ganaderos nos ha llevado a desarrollar una solución
                  revolucionaria que mejora la crianza del ganado bovino en sus estapas más
                  tempranas, con el objetivo de ayudar a los ganaderos a tener establos cerrados.</p>
                <div class="row gy-4 gy-md-0 gx-xxl-5X">
                  <div class="col-12 col-md-6">
                    <div class="d-flex">
                      <div class="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="mb-3">Registro Integral</h4>
                        <p class="text-secondary mb-0">Moomonitor permite a los ganaderos llevar un registro
                          completo de sus vaquillas, desde la fecha de nacimiento hasta su historial
                          médico y su crecimiento a lo largo del tiempo.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="d-flex">
                      <div class="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="mb-3">Seguimiento de Crecimiento</h4>
                        <p class="text-secondary mb-0">Nuestra aplicación facilita el seguimiento del
                          crecimiento de las vaquillas, lo que permite a los ganaderos tomar decisiones
                          informadas sobre la alimentación y la salud de sus animales.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="d-flex">
                      <div class="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="mb-3">Alertas y Recordatorios</h4>
                        <p class="text-secondary mb-0">Configura alertas y recordatorios para tareas
                          importantes, lo que garantiza que tus vaquillas reciban la atención adecuada en
                          el momento adecuado.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="d-flex">
                      <div class="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 class="mb-3">Análisis de Datos</h4>
                        <p class="text-secondary mb-0">Proporcionamos análisis de datos poderosos que te
                          ayudarán a optimizar tus operaciones, reducir costos y maximizar tus ingresos.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home;
