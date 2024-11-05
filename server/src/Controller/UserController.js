const UserModel = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { errorHandle } = require('../errorHandling/errorHandling.js');
require('dotenv').config()

module.exports.Usersignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password) { return res.status(400).send({ message: 'Password is required' }) }

        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const user = await UserModel.create(req.body);

        res.status(201).send({ Status: true, msg: 'User created successfully', data: user });
    }
    catch (err) { return errorHandle(err, res) }
};

module.exports.Userlogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) { return res.status(401).json({ message: 'Authentication failed. Invalid email or password' }) }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) { return res.status(401).json({ message: 'Authentication failed. Invalid email or password' }) }
        
        const token = jwt.sign({ userId: user._id }, process.env.SecrectKey, { expiresIn: '1h' });
        res.status(200).send({ status: true, msg: 'User login successfully', UserId: user._id, token: token });
    }
    catch (err) { return errorHandle(err, res) }
}