import { User } from '../models/User.js';
import { ObjectId } from "mongodb";


const get_all_users = async (req, res) => {
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
    };
    const user = await User.findOne({_id: new ObjectId(req.params.id)});
    if (!user) {
        res.status(404).send('user with given ID is not found!');
    }
    else {
        try {
            await User
                    .deleteOne({_id: new ObjectId(req.params.id)})
                    .then('deleted successfully')
                    .catch((err) => console.log(err));
            res.send(user);
        }
        catch(err) {
            console.log('error', err);
        }
    }
}

export { get_all_users, get_one_user, update_one_user, delete_one_user };
