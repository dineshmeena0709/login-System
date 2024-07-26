    
    const { signupValidation, loginValidation, profileUpdateValidation } = require("../Middlewares/AuthValidation");
const {signup, login,update,get }= require('../Controllers/authController');

const authenticateToken= require("../Middlewares/authmiddleware")


const multer = require('multer');
const path = require('path');
const router = require("express").Router();


// Setup storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage });

// Apply `upload.single('image')` middleware to handle image uploads
router.post('/update', authenticateToken, upload.single('image'), update);


router.post('/login',loginValidation, login)
router.post('/signup',signupValidation, signup)

router.get("/get", authenticateToken, get )
 // Adjust destination as needed

router.post('/update', authenticateToken, upload.single('image'), update);


module.exports = router;