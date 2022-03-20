const signUpSchema = require("../schema/signup.schema");
const signInSchema = require("../schema/signin.schema");
const UserValidate ={};
UserValidate.validateSignUp = (req, res, next) =>{
    try {
        console.log("Inside validate sign up");
        const body = req.body || {};

        const validateSignUp = signUpSchema.validate(body, { abortEarly: false });

        if(validateSignUp.errors){
            res.status(400).json({status:false, error: validateSignUp.error});
        } else {
            next();
        }
    } catch (error) {
        res.status(400).json({status:false, error:error.message});
    }
}
UserValidate.validateSignIn = (req, res, next)=>{
    try {
        console.log("Inside validate sign up");
        const body = req.body || {};

        const validateSignIN = signInSchema.validate(body, { abortEarly: false });

        if(validateSignIN.errors){
            res.status(400).json({status:false, error: validateSignIN.error});
        } else {
            next();
        }
    } catch (error) {
        res.status(400).json({status:false, error:error.message});
    }
}
module.exports = UserValidate;