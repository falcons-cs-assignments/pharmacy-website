import "./styles/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import Product from "./pages/Product";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route path='/' element={<Home />} />
					<Route path='/category/:category_name' element={<Category />} />
					<Route path='/product/:id' element={<Product />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route
					path='*'
					element={
						<h1
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100vh",
								color: "red",
								margin: "0",
								fontSize: "10vw",
							}}
						>
							404 Wrong path
						</h1>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
