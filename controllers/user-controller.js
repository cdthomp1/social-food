const User = require('../models/User');


exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Users: ${error.message}`
        })
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create(req.body);

        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Adding User: ${error.message}`
            })
        }
    }



}