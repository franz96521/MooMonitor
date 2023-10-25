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
      url:"https://cdn.pixabay.com/photo/2016/08/06/19/23/highland-cow-1575005_1280.jpg",
      title: "Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

    },
  ]
  return (<>

    <DarkVariantExample images={images} />
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

export default Home;
