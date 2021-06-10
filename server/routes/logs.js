const router = require("express").Router();
const logsController = require("../controllers/logs");
const {verifyApiKey,verifyUser} = require('../middlewares/auth')


// Add Log
router.post("/:id",verifyApiKey, async (req, res) => { // :id is AppID
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
      error: error.message ||  "Something went wrong",
    });
  }
});

// Get logs by filter
router.get("/",verifyUser, async (req, res) => {
  try {
    let {filter, page, limit} = req.body 
    let userID = req.user.id
    let data = await logsController.getLogsForFilter(userID, filter, page, limit)
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    res.status(500).json({
      error: error.message ||  "Something went wrong",
    });
  }
});

module.exports = router