const userModel = require('../model/user.model');
const jwt = require("../middleware/jwt.middleware");
const userCtrl = {};

userCtrl.signUp = async (req, res)=>{
    try {
        const userResult = await userModel.findAll({
            where: { email: req.body.email}
        });
        
        if(userResult.length > 0){
            res.status(400).json({status:false, error:"Email id already exists."});
            return;
        }
        const user = await userModel.create({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            profile_image: `${process.env.SERVER_HOST}:${process.env.PORT}/${req.file.filename}`
        });

        await user.save();
        
        const userDetails = {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email
        };

        res.status(201).json({status:true, token: jwt.generateToken(userDetails)});

    } catch (error) {
        res.status(400).json({status:false, error:error.message});
    }
}

userCtrl.signIn = async (req, res)=>{
    try {
        const userResult = await userModel.findOne({
            where: { email: req.body.email}
        });

        if(userResult){
            const userDetails = {
                firstName: userResult.firstname,
                lastName: userResult.lastname,
                email: userResult.email
            };
            res.status(200).json({status:true, token: jwt.generateToken(userDetails)});
        } else {
            res.status(400).json({status:false, error: "User not found."});
        }
    } catch (error) {
        res.status(400).json({status:false, error:error.message});
    }
}

userCtrl.showUser = async(req, res)=>{
    try {
        const userResult = await userModel.findOne({
            where: { email: req.body.user.email}
        });

        if(userResult){
            const userDetails = {
                id: userResult.id,
                firstName: userResult.firstname,
                lastName: userResult.lastname,
                email: userResult.email,
                profileImage: userResult.profile_image
            };
            res.status(200).json({status:true, user: userDetails});
        } else {
            res.status(400).json({status:false, error: "User not found."});
        }
    } catch (error) {
        res.status(400).json({status:false, error:error.message});
    }
}

userCtrl.updateUser = async (req, res)=>{
    try {
        const userResult = await userModel.findOne({
            where: { email: req.body.user.email}
        });

        const userObj = req.body || {};
        userObj.firstName = userObj.firstName || "";
        userObj.lastName = userObj.lastName || "";
        userObj.profile_image = userObj.profile_image || ''

        if(!userResult){
            res.status(400).json({status:false, error: "User not found."});
            return;
        }

        const updateObj = {};

        if(userObj.firstName != ''){
            updateObj.firstName = userObj.firstName;
        }
        if(userObj.lastName != ''){
            updateObj.lastName = userObj.lastName;
        }
        if(req.file){
            updateObj.profile_image = `${process.env.SERVER_HOST}:${process.env.PORT}/${req.file.filename}`;
        }

        console.log(updateObj);
        console.log(userResult.id);

       const user = await userModel.update(updateObj , {
            where: {
                id: userResult.id
            }
        });

        // await user.save();

        res.status(200).json({status:true, message:"Users details updated successfully."});
    } catch (error) {
        res.status(400).json({status:false, error:error.message});
    }
}

module.exports = userCtrl;