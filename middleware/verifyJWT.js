const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("ali")
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log("ali2")

    console.log(token)
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
         
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT