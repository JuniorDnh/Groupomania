const { user } = require('../models');
const UserModel = require('../models/userModel');

module.exports.signUp = async (req, res) => {
    console.log(req);
    const {firstname, lastname, email, password} = req.body

    try {
        const user = await UserModel.create({firstname, lastname, email, password });
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        res.status(500).send({ err })
    }
   
}