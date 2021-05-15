const _ = require("lodash"),
    App = require("../models/App"),
    Log = require("../models/Log"),
    mongoose = require("mongoose"),
    User = require("../models/User");
ObjectId = mongoose.SchemaTypes.ObjectId; // TODO: Add all ObjectID validations

exports.addLog = async (log, appID) => {
    if (!log || !appID) {
        throw new Error("Invalid Input");
    }
    if (Object.keys(log).length === 0) {
        throw new Error(`Log Object can't be empty`);
    }
    let { level, description, environment, severity } = log;
    if (!level || !description || !environment || !severity) {
        throw new Error(`Invalid Log object`);
    }
    let app = await App.findById(appID);
    if (!app) {
        throw new Error(`Invalid appID`);
    }
    if (typeof description === "object") {
        description = JSON.stringify(description);
    }
    let logObj = new Log({ appID, level, description, environment, severity });
    await logObj.save();
    app.logs.unshift(logObj._id);
    app.counts.forEach((countObj) => {
        if (countObj.level === level) {
            countObj.count += 1;
        }
    });
    await app.save();
    // TODO : Check webhooks and run them if condition matches and reset count
    return {
        status: "Added log",
    };
};

exports.getLogsForFilter = async (
    userID,
    filter = {},
    page = 0,
    limit = 20
) => {
    if(!userID) throw new Error(`userID not present`)
    let logs, count, data={}, appIDs;
    if (typeof filter.appID === "undefined") {
        appIDs = (await User.findById(userID, "appIds")).appIds;
        if (appIDs && appIDs.length === 0) {
            return {
                logs: [],
            };
        } else {
            filter.appID = { $in: appIDs };
        }
    }
    logs = await Log.find(filter).sort({ _id: -1 }).skip(page*limit).limit(limit);
    count = await Log.find(filter).count();
    data["logs"] = logs;
    if (logs && logs.length>0) {
        if (count > ((page * limit) + logs.length)) {
            data["next"] = { page: page + 1, limit };
        }
        if (page !== 0) {
            data["prev"] = { page: page - 1, limit };
        }
    } else {
        if (count > 0) {
            data["prev"] = { page: Math.round(count / limit)-1, limit };
        }
    }
    return data;
};
