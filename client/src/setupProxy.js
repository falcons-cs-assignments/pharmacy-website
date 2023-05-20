const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://pharmacy-website-api.onrender.com",
			changeOrigin: true,
		})
	);
};
