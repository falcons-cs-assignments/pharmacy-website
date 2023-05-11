import jwt from "jsonwebtoken";
import { User } from '../models/User.js';


export const authToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ status :'Authentication failed', error: err });
            } else {
                console.log("decodedToken", decodedToken);
                try {
                    const user = await User.findById(decodedToken.id);
                    if (user) {
                      req.user = {
                        _id: user._id,
                        role: user.role // Include the role in the req.user object
                      };
                      next();
                    } else {
                      res.status(401).send('Unauthorized');
                    }
                  } catch (err) {
                    console.log('err', err);
                    res.status(401).send('Unauthorized');
                  }
            }
        });
    } else {
        console.log("Token not found!");
        res.status(401).send("You are not authenticated!");
    }
};
