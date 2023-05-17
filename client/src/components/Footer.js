import "../styles/Footer.css";

function Footer() {
	return (
		<footer id='footer'>
			<div className='container'>
				<div className='left'>
					<p>&copy; 2023 copy right reserved</p>
				</div>
				<div className='right'>
					<a href='/'>
						<i className='fab fa-facebook'></i>
					</a>
					<a href='/'>
						<i className='fab fa-twitter'></i>
					</a>
					<a href='https://github.com/falcons-cs-assignments/pharmacy-website' rel='noreferrer' target='_blank'>
						<i className='fab fa-github'></i>
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
