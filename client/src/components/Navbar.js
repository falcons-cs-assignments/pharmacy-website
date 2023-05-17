import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();

	const handleLogout = () => {
		axios.post("/api/users/logout").then(() => {
			navigate("/login-signup");
		});
	};

	return (
		<header id='navbar'>
			<div className='container'>
				<nav>
					<div className='logo'>
						<Link to='/'>
							<img src={logo} alt='logo' width='70' height='64' />
						</Link>
					</div>
					<ul>
						<li>
							<Link to='/'>
								<i className='fas fa-heart'>Favorites</i>
							</Link>
						</li>
						<li>
							<Link onClick={handleLogout}>Logout</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
