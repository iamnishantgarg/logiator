const _ = require('lodash'),
    App = require('../models/App'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.SchemaTypes.ObjectId; // TODO: Add all ObjectID validations

exports.createApp = async(user, appName) => {
    if(!user || !appName) {
        throw new Error('Invalid input')
    }
    let app = await App.findOne({
        name: appName,
        user
    })
    if(app) {
        throw new Error('App with this name already exists for the user')
    }
    
    app = new App({user, name: appName, logs: [], counts , webhooks: []})
    return {
        appID: app._id
    }
}

exports.deleteApp = async(appID) => {
    if(!appID) {
        throw new Error('Invalid input')
    }
    let app = await App.findOne({
        _id: appID,
    })
    if(!app) {
        throw new Error(`App with this ID doesn't exist `)
    }
    app.delete()
    return {
        status: "Deleted",
        appID: app._id
    }
}

exports.resetCounters = async(appID, levels) => {
    if(!appID) {
        throw new Error('Invalid App ID')
    }
    if(levels.length==0) {
        await App.findByIdAndUpdate(appID, {
            counts: counts
        })
        return {
            status: "Successfully reset all the counters to 0"
        }
    }
    let app = await App.findById(appID)
    for(const val of app.counts) {
        if(levels.includes(val.level)) {
            val = {
                level: val.level,
                count: 0,
                incidentCount: 0
            }
        }
    }
    app.save()
    return {
        status: "Successfully reset the given counters to 0"
    }
}

exports.getAllApps = async(userID) => {
    if(!userID) {
        throw new Error('Invalid User ID')
    }
    const apps = await App.find({user: userID})
    const data = apps.map(app=>{
        return {
            appName: app.name,
            appID: app._id
        }
    })
    return data
}
exports.addWebhook = async(appID, condition, curl) => {
    if(!appID || !condition || !curl || !condition.entitiy || !condition.count|| !condition.comparision) {
        throw new Error('Invalid Input')
    }
    let app = await App.findById(appID)
    if(!app) {
        throw new Error(`Invalid App ID`)
    }
    app.webhooks.push({
        condition, curl
    })
    app.save()
    return {
        status: "Added webhook to app"
    }
}

const counts = [
    {
        level: "error",
        incidentCount: 0,
        count: 0
    },
    {
        level: "warn",
        incidentCount: 0,
        count: 0
    },
    {
        level: "verbose",
        incidentCount: 0,
        count: 0
    },
    {
        level: "info",
        incidentCount: 0,
        count: 0
    },
    {
        level: "debug",
        incidentCount: 0,
        count: 0
    },
    {
        level: "silly",
        incidentCount: 0,
        count: 0
    }
]