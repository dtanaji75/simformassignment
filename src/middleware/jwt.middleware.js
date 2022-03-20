const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (payload)=>{
        return jwt.sign({payload}, process.env.jwt_sceret , {
            expiresIn: '1h'
        });
    },
    verifyToken: (req, res, next) =>{
        try {
            const token = req.headers.authorization.replace('Bearer ','') || "";

            console.log(token);
            
            const user = jwt.verify(token, process.env.jwt_sceret);

            console.log("user :: ", user);

            req.body.user = user.payload;

            next();
            
        } catch (error) {
            console.log(error);
            if( error instanceof jwt.TokenExpiredError) {
                res.status(400).json({status: false, error: "Token Expired..."});
            } else {
                res.status(401).json({status:false, error: error.message});
            }
        }
    }
}