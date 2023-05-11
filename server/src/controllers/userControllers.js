import { User } from '../models/User.js';
import { ObjectId } from "mongodb";


const get_all_users = async (req, res) => {
    // Ensure that the user making the request is authenticated
    if (!req.user) {
        res.status(401).send('Unauthorized');
        return;
    }
    // Check if the authenticated user is the admin
    if (req.user.role !== 'Admin') {
        console.log(req.user);
        res.status(403).send('Forbidden');
        return;
    }
    const users = await User.find();
    res.send(users);
}

const get_one_user = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send('Invalid ObjectID!');
        return;
    };
    const user = await User.findOne({_id: new ObjectId(req.params.id)});
    if (!user) {
        res.status(404).send('user with given ID is not found!');
    }
    else {
        res.send(user);
    }
}

const update_one_user = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send('Invalid ObjectID!');
        return;
    };
    // Ensure that the user making the request is authenticated
    if (!req.user) {
        res.status(401).send('Unauthorized');
        return;
    }
    // Check if the authenticated user is the admin or the user being updated
    if (req.user.role !== 'Admin' && req.params.id !== req.user.id) {
        console.log(req.user);
        res.status(403).send('Forbidden');
        return;
    }
    const user = await User.findOne({_id: new ObjectId(req.params.id)});
    if (!user) {
        res.status(404).send('user with given ID is not found!');
    }
    else {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        try {
            const updateUser = await User.updateOne({_id: new ObjectId(req.params.id)}, newUser);
            res.status(200).send('updated successfully');
        }
        catch(err) {
            res.status(500).send(err);
        }
    }
}

const delete_one_user = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send('Invalid ObjectID!');
        return;
    }
  
    try {
        const userToDelete = await User.findOne({ _id: new ObjectId(req.params.id) });
        if (!userToDelete) {
                res.status(404).send('User with the given ID is not found!');
                return;
        }
        // Ensure that the user making the request is authenticated
        if (!req.user) {
                res.status(401).send('Unauthorized');
                return;
        }
        // Check if the authenticated user is the admin or the user being deleted
        if (req.user.role === 'Admin' || req.params.id === req.user.id) {
                await User.deleteOne({ _id: new ObjectId(req.params.id) });
                res.status(200).send('Deleted successfully');
        } else {
                console.log(req.user)
                res.status(403).send('Forbidden');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
  

export { get_all_users, get_one_user, update_one_user, delete_one_user };
