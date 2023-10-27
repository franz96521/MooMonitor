import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function MainCards() {
  return (
    <CardGroup style={{ margin: '1rem',padding:"1rem" }}>
      <Card >
        <Card.Img variant="top" src='https://www.procampo.com.ec/images/articulos/2019/Eficiencia_1.jpg'        />
        <Card.Body>
          <Card.Title>Únete a Nosotros</Card.Title>
          <Card.Text>
            Únete a la comunidad Moomonitor y descubre cómo puedes mejorar la crianza del
            ganado, aumentar la rentabilidad y contribuir a un futuro más sostenible para la
            industria ganadera. ¡Estamos emocionados de acompañarte en este viaje hacia el
            éxito ganadero!
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://www.fdlreporter.com/gcdn/-mm-/9256e442ab5c35e06b5bf1661ee1d1d699c6576f/c=0-0-1865-1054/local/-/media/2015/08/19/FondduLac/B9318517963Z.1_20150819170644_000_GMLBM1OTJ.1-0.jpg?width=1320&height=746&fit=crop&format=pjpg&auto=webp" />
        <Card.Body>
          <Card.Title>Nuestro Compromiso con la Excelencia
          </Card.Title>
          <Card.Text>
            En Moomonitor, estamos comprometidos con la excelencia en todo lo que hacemos.
            Trabajamos en estrecha colaboración con ganaderos reales para desarrollar y
            perfeccionar nuestra aplicación, y estamos comprometidos con la seguridad de tus
            datos y la privacidad de tu información
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.c6LNuQclyKg2Ar3ffeHx9gHaFj?pid=ImgDet&rs=1" />
        <Card.Body>
          <Card.Title>Fomentando la Sostenibilidad
          </Card.Title>
          <Card.Text>
            La gestión adecuada de la reproducción y el crecimiento no solo tiene beneficios
            económicos, sino que también contribuye a la sostenibilidad de la industria
            ganadera. Al evitar la compra constante de ganado adulto, se reduce la presión
            sobre los recursos naturales y se fomenta una producción de leche más
            responsable y ecológica.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default MainCards;