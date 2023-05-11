import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log('err', err);
            }
            else {
                console.log("decodedToken", decodedToken);
                next();
            }
        })
    }
    else {
        console.log("Token not found!");
        res.send("You are not authenicated!");
    }
}
