const _ = require('lodash'),
    KEY = require('../models/Key'),
    uuid = require('uuid4'),
    mongoose = require('mongoose');


// create key
exports.createKey = async (req, res, next) => {
    const { label } = req.body;
    if (_.isEmpty(label)) return res.status(400).json({ message: "mandatory variable missing" });
    try {
        const key = new KEY({ label, user: req.user.id, value: uuid() });
        await key.save();
        return res.status(200).json({ message: "successfully created new api key", data: key });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" });
    }
}

// delete key
exports.deleteKey = async (req, res, next) => {
    const id = req.params.id;
    if (_.isEmpty(id)) return res.status(400).json({ message: "mandatory variable missing" });
    try {
        const key = await KEY.findOne({ _id: mongoose.Types.ObjectId(id) });
        if (!key) return res.status(404).json({ message: "key not found" });
        (await key).delete();
        return res.status(200).json({ message: "successfully deleted api key" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" });
    }

}

//get all keys
exports.getAllKeys = async (req, res, next) => {
    try {
        const keys = await KEY.find({ user: req.user.id }, ["label", "id"]).sort({ 'createdAt': -1 });
        return res.status(200).json({ message: "successfully fetched api keys", data: keys });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" });
    }
}