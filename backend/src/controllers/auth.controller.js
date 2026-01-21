
const UserModel = require('../models/User.model');
const { generatetoken } = require('../utils/jwt');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

       const user = await UserModel.create({
             name, 
             email,
             password, 
             role 
        });
      
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    console.log("Login request received");
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const token = generatetoken(user);
        //development only 
        res.cookie('token', token, { httpOnly: true, secure: false });
        //res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};