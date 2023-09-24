const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(password.length < 6){
            return res.status(422).json({error: 'Password length must be at least 6.'})
        }

        var hashedPassword = await bcrypt.hash(password, 10);
        // TODO: CHANGE DEFAULT TRUE
        await User.create({email, password: hashedPassword, isSubscriber: true});

        res.status(201).json({message: 'User created successfully.'});
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            return res.status(400).json({ message: 'You have already registered with this email.' });
        }
        else {
            res.status(500).json({
                message: 'An error occurred while processing the file.',
                error: error
            });
        }
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({message: 'Invalid email or password.'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid email or password.'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }
};

const updateUserSub = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const {isSubscriber} = req.body;

        if(!user){
            return res.status(401).json({message: 'Invalid token. Cannot found this user.'});
        }

        user.isSubscriber = isSubscriber;
        await user.save();

        res.status(200).json({message: 'User updated successfully.'})
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while processing the file.',
            error: error
        });
    }

}

module.exports = {
    registerUser,
    loginUser,
    updateUserSub
};