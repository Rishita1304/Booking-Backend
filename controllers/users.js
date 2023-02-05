import User from '../models/User.js';

export const getUser = async (req, res, next) => {
    try{

        const user = await User.findById(req.params.id);
        res.status(200).json(user);

    } catch(err) {
        res.status(500).json(err);

    }
};

export const getAllUsers = async (req, res, next) => {
    try{

        const users = await User.find();
        res.status(200).json(users);

    } catch(err) {

        res.status(500).json(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json("User Deleted!")
    }catch(err){
        res.status(500).json(err);
    }
};

export const updateUser = async (req, res, next) => {
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPass;
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new: true})
        res.status(201).json(updateUser);
    }catch(err){
        res.status(500).json(err);
    }
}