const router = require("express").Router();
const appController = require("../controllers/app");
const { route } = require("./logs");

// Create app
router.post("/", async (req, res) => {
  try {
    const { user, appName } = req.body;
    const data = await appController.createApp(user, appName);
    res.status(201).json({
      data,
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Delete app
router.delete("/", async (req, res) => {
  try {
    const { appID } = req.body;
    const data = await appController.deleteApp(appID);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Reset counter for app by level -- If no level passed reset all counters
router.put("/:id", async (req, res) => {
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
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Get all apps of user
router.get("/", async (req, res) => {
  try {
    const userID = req.headers["x-consumer-username"];
    const data = await appController.getAllApps(userID);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Add Webhook/Condition for app
router.put("/webhook", async (req, res) => {
  try {
    const { appID, condition, curl } = req.body;
    const data = await appController.addWebhook(appID, condition, curl);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});


router.get("/:id", async(req, res)=>{
  try {
    const appID = req.params.id
    const data = await appController.getAppDetails(appID);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
})
module.exports = router