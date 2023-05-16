import "../styles/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("/api/users/signup", {
				name: event.target.name.value,
				email: event.target.email.value,
				password: event.target.password.value,
			})
			.then((res) => {
				console.log(res.data.data);
				navigate("/login");
			})
			.catch((err) => {
				setError(err.response.data.error);
				setTimeout(() => {
					setError("");
				}, 2000);
			});
	};

	return (
		<div id='signup'>
			<form className='box' onSubmit={handleSubmit}>
				<h1>Signup</h1>
				<input type='text' name='name' id='name' placeholder='Name' autoComplete='off' required />
				<input type='email' name='email' id='email' placeholder='Email' autoComplete='off' required />
				<input type='password' name='password' id='password' placeholder='Password' minLength={8} autoComplete='off' required />
				<input type='submit' id='submit' value='Signup' />
				<p>
					Already have an account? <a href='/login'>Login</a>
				</p>
				<p style={{ color: "red" }}>{error}</p>
			</form>
		</div>
	);
}

export default Signup;
