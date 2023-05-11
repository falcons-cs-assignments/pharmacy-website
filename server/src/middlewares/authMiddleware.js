import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ status :'Authentication failed', error: err });
            } else {
                console.log("decodedToken", decodedToken);
                req.user = decodedToken;
                next();
            }
        });
    } else {
        console.log("Token not found!");
        res.status(401).send("You are not authenticated!");
    }
};
