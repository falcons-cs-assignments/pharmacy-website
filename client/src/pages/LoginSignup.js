import "../styles/LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginSignup() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");

	const handleSignup = (event) => {
		event.preventDefault();
		axios
			.post("/api/users/signup", {
				name: event.target.name.value,
				email: event.target.email.value,
				password: event.target.password.value,
			})
			.then((res) => {
				console.log(res.data.data);
				setMessage("Account created successfully");
				setTimeout(() => {
					setMessage("");
				}, 1200);
			})
			.catch((err) => {
				setMessage(err.response.data.error);
				setTimeout(() => {
					setMessage("");
				}, 2500);
			});
	};

	const handleLogin = (event) => {
		event.preventDefault();
		axios
			.post("/api/users/login", {
				email: event.target.email.value,
				password: event.target.password.value,
			})
			.then((res) => {
				console.log(res.data.token, res.data.expiresIn);
				setMessage("Logged in successfully");
				setTimeout(() => {
					navigate("/");
				}, 1000);
			})
			.catch((err) => {
				setMessage(err.response.data.error);
				setTimeout(() => {
					setMessage("");
				}, 1600);
			});
	};

	return (
		<div id='login-signup'>
			<div className='main'>
				<p className='message' style={{ display: message ? "inline" : "none" }}>
					{message}
				</p>
				<input type='checkbox' id='chk' aria-hidden='true' />

				<div className='signup'>
					<form onSubmit={handleSignup}>
						<label htmlFor='chk' aria-hidden='true'>
							Sign up
						</label>
						<input type='text' name='name' placeholder='Full Name' autoComplete='off' required />
						<input type='email' name='email' placeholder='Email' autoComplete='off' required />
						<input type='password' name='password' placeholder='Password' autoComplete='off' required />
						<input type='submit' value='Sign up' />
					</form>
				</div>

				<div className='login'>
					<form onSubmit={handleLogin}>
						<label htmlFor='chk' aria-hidden='true'>
							Login
						</label>
						<input type='email' name='email' placeholder='Email' autoComplete='off' required />
						<input type='password' name='password' placeholder='Password' autoComplete='off' required />
						<input type='submit' value='Login' />
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginSignup;
