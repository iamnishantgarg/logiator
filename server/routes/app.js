const router = require("express").Router();
const appController = require("../controllers/app");
const { route } = require("./logs");
const {verifyUser} = require('../middlewares/auth')

// Create app
router.post("/", verifyUser,  async (req, res) => {
    try {
        const { user, appName } = req.body;
        const data = await appController.createApp(user, appName);
        res.status(201).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});

// Delete app
router.delete("/", verifyUser,  async (req, res) => {
    try {
        const { appID } = req.body;
        const data = await appController.deleteApp(appID);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});

// Add Webhook/Condition for app
router.put("/webhook",verifyUser, async (req, res) => {
    try {
        const { appID, condition, url, message } = req.body;
        console.log(appID, condition, url, message);
        const data = await appController.addWebhook(
            appID,
            condition,
            url,
            message
        );
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});

// Reset counter for app by level -- If no level passed reset all counters
router.put("/:id",verifyUser, async (req, res) => {
    try {
        let levels = [];
        if (req.body.levels) {
            levels = req.body.levels;
        }
        const appID = req.params.id;
        const data = await appController.resetCounters(appID, levels);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});

// Get all apps of user
router.get("/", verifyUser,  async (req, res) => {
    try {
        const userID = req.headers["x-consumer-username"];
        const data = await appController.getAllApps(userID);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});


router.get("/:id", verifyUser, async (req, res) => {
    try {
        const appID = req.params.id;
        const data = await appController.getAppDetails(appID);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});
module.exports = router;
