import "../styles/Product.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Product() {
	const [message, setMessage] = useState("");
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { productId } = useParams();

	useEffect(() => {
		axios
			.get("/api/products/" + productId)
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data);
				navigate("/login-signup");
			});
	}, [navigate, productId]);

	const addFavorite = () => {
		setMessage("Added successfully");
		axios
			.put("/api/users/" + localStorage.getItem("userId"), {
				favProduct: product,
				favOperation: "add",
			})
			.then((res) => {
				console.log(res.data);
				setMessage("");
			})
			.catch((err) => {
				console.log(err.response.data);
				navigate("/login-signup");
			});
	};

	if (loading) return <Loading />;

	return (
		<div id='product'>
			<Navbar />
			<main>
				<div className='product-container'>
					<div className='image-container'>
						<img src={product.image} alt='Product' />
					</div>
					<div className='details-container'>
						<h1 className='product-name'>{product.name}</h1>
						<p className='product-price'>${product.price}</p>
						<p className='product-description'>{product.description}</p>
						<p className='product-category'>Category: {product.category}</p>
						<div className='button-container'>
							<button className='add-to-cart-btn'>Add to Cart</button>
							<button className='add-to-favorites-btn' onClick={addFavorite}>
								Add to Favorites
							</button>
						</div>
					</div>
					<p className='added-to-favorites'>{message}</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Product;
