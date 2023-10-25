import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
	return (
		<>
			{['md'].map((expand) => (
				<Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
					<Container fluid>
						<Navbar.Brand href="/">MooMonitor</Navbar.Brand>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									MooMonitor
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link href="/pricing">Pricing</Nav.Link>
									<Nav.Link href="/Benefits">Benefits</Nav.Link>
									<Nav.Link href="/Mision">Mision</Nav.Link>

									<NavDropdown
										title="Dahsboard"
										id={`offcanvasNavbarDropdown-expand-${expand}`}
									>
										<NavDropdown.Item href="/login">Login</NavDropdown.Item>
										<NavDropdown.Item href="/Signup">Signup</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
}

export default NavBar;