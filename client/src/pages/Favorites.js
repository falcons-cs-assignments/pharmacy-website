import "../styles/Favorites.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("/api/users/" + localStorage.getItem("userId"))
			.then((res) => {
				const favorites = res.data.favorites;

				setFavorites(favorites);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.data);
				navigate("/login-signup");
			});
	}, [navigate]);

	const handleClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	const removeFavorite = (productId) => {
		setLoading(true);
		axios
			.put("/api/users/" + localStorage.getItem("userId"), {
				favProduct: productId,
				favOperation: "remove",
			})
			.then((res) => {
				console.log(res.data);
				setFavorites(favorites.filter((product) => product._id !== productId));
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data);
				navigate("/login-signup");
			});
	};

	if (loading) return <Loading />;

	return (
		<div id='favorites'>
			<Navbar />
			<main>
				<ul className='products-list'>
					{favorites.length === 0 ? (
						<li className='no-products'>No Favorites</li>
					) : (
						favorites.map((product) => (
							<li className='product' onClick={() => handleClick(product._id)} key={product._id}>
								<img src={process.env.PUBLIC_URL + "/images/panadol.png"} alt={product.name} />
								<p>{product.name}</p>
								<p>{product.price}$</p>
								<button
									className='remove-favorite'
									onClick={(e) => {
										e.stopPropagation();
										removeFavorite(product._id);
									}}
								>
									remove
								</button>
							</li>
						))
					)}
				</ul>
			</main>
			<Footer />
		</div>
	);
}

export default Favorites;
