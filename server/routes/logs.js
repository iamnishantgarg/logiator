const router = require("express").Router();
const logsController = require("../controllers/logs");



// Add Log
router.post("/:id", async (req, res) => { // :id is AppID
  try {
    let appID = req.params.id
    let {log} = req.body
    let data = await logsController.addLog(log, appID)
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

module.exports = router