import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("/api/users/login", {
				email: event.target.email.value,
				password: event.target.password.value,
			})
			.then((res) => {
				console.log(res.data.token, res.data.expiresIn);
				navigate("/");
			})
			.catch((err) => {
				setError(err.response.data.error);
				setTimeout(() => {
					setError("");
				}, 2000);
			});
	};

	return (
		<div id='login'>
			<form className='box' onSubmit={handleSubmit}>
				<h1>Login</h1>
				<input type='email' name='email' id='email' placeholder='Email' autoComplete='off' required />
				<input type='password' name='password' id='password' placeholder='Password' autoComplete='off' required />
				<input type='submit' id='submit' value='login' />
				<p>
					Don't have an account? <a href='/signup'>Signup</a>
				</p>
				<p style={{ color: "red" }}>{error}</p>
			</form>
		</div>
	);
}

export default Login;
