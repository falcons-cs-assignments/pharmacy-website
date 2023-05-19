import "./styles/App.css";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
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
					<Route path='/category/:categoryName' element={<Category />} />
					<Route path='/product/:productId' element={<Product />} />
				</Route>
				<Route path='/login-signup' element={<LoginSignup />} />
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
								userSelect: "none",
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
