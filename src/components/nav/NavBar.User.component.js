import { useContext, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Add, PieChart, Logout, Home } from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import logo from '../../logo.png';
import 'bootstrap/dist/css/bootstrap.css';

const NavBar = () => {
	const [show, setShow] = useState(false);
	const toggleDrawer = (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setShow(show => !show);
	};
	return (
		<>
			<AppBar position="static"
			 style={{ backgroundColor: "white" }} >
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inehrit"
						aria-label="menu"
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component={Link} to="/Dashboard" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
						<Link to="/Dashboard" style={{ textDecoration: "none", color: "inherit" }}>
							<img src={logo} style={{ height: "3rem" }} />
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
			<TemporaryDrawer show={show} setShow={setShow} toggleDrawer={toggleDrawer} />
		</>
	);
};

const TemporaryDrawer = (props) => {
	const { show, toggleDrawer } = props;
	const { logOutUser } = useContext(UserContext);

	const logOut = async () => {
		await logOutUser();
		window.location.reload(true);
		return;
	}

	const navLinks = [
		{
			text: 'Home',
			Icon: Home,
			link: '/Dashboard',
		},
		{
			text: 'Vacas',
			Icon: PieChart,
			link: '/Vacas',
		},
		{
			text: 'Farms',
			Icon: PieChart,
			link: '/Farms',
		},
		{
			text: 'HistorialMedico',
			Icon: PieChart,
			link: '/HistorialMedico',
		},
		{
			text: 'Calendario',
			Icon: CalendarMonthIcon,
			link: '/Calendario',
		},
		{
			text: 'Logout',
			Icon: Logout,
			action: logOut,
		},

	];

	const DrawerList = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer}
			onKeyDown={toggleDrawer}
		>
			<List>
				{
					navLinks.map(({ text, Icon, link, action }) => {
						return link ?
							<Link to={link} style={{ textDecoration: "none", color: "inherit" }} key={text}>
								<ListItem button>
									<ListItemIcon>
										<Icon />
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							</Link>
							:
							<ListItem button onClick={action} key={text}>
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
					})
				}
			</List>
		</Box>
	);

	return (
		<div>
			<Drawer
				open={show}
				onClose={toggleDrawer}
			>
				{<DrawerList />}
			</Drawer>
		</div>
	);
}

export default NavBar;