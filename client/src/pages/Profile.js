import "../styles/Profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
	const [message, setMessage] = useState("");
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("/api/users/" + localStorage.getItem("userId"))
			.then((res) => {
				setUser(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data);
				navigate("/login-signup");
			});
	}, [navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.put("/api/users/" + localStorage.getItem("userId"), {
				name: event.target.name.value,
				email: event.target.email.value,
				oldPassword: event.target.oldPassword.value,
				newPassword: event.target.newPassword.value,
			})
			.then((res) => {
				setMessage(res.data);
				setTimeout(() => {
					setMessage("");
				}, 1000);
			})
			.catch((err) => {
				setMessage(err.response.data.codeName);
				setTimeout(() => {
					setMessage("");
				}, 1500);
			});
	};

	const deleteAccount = () => {
		axios
			.delete("/api/users/" + localStorage.getItem("userId"))
			.then((res) => {
				navigate("/login-signup");
			})
			.catch((err) => {
				setMessage(err.response.data);
				setTimeout(() => {
					setMessage("");
				}, 1500);
			});
	};

	if (loading) return <Loading />;

	return (
		<div id='profile'>
			<Navbar />
			<main>
				<h1>Profile</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' id='name' defaultValue={user.name} />
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' defaultValue={user.email} />
					<label htmlFor='oldPassword'>Old Password</label>
					<input type='password' name='oldPassword' id='oldPassword' placeholder='Enter the old password' />
					<label htmlFor='newPassword'>New Password</label>
					<input type='password' name='newPassword' id='newPassword' placeholder='Enter the new password' />
					<input type='submit' value='Update' />
				</form>
				<button onClick={deleteAccount}>Delete Account</button>
				<p className='message'>{message}</p>
			</main>
			<Footer />
		</div>
	);
}

export default Profile;
