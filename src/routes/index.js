const userCtrl = require("../controller/user.controller");
const upload = require("../config/fileUpload");
const validate = require("../middleware/user.middleware");
const jwt = require("../middleware/jwt.middleware");

const routes = (app)=>{
    app.post('/api/uploadImage',upload.single('profileImage'),(req, res)=>{
        res.send(req.file);
    })
    app.post('/api/signup', upload.single('profileImage'), validate.validateSignUp, userCtrl.signUp);
    app.post('/api/signin', validate.validateSignIn, userCtrl.signIn);
    app.get('/api/showUser', jwt.verifyToken, userCtrl.showUser);
    app.post('/api/updateUser', upload.single('profileImage'), jwt.verifyToken, userCtrl.updateUser);
}

module.exports = routes;