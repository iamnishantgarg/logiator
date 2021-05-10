const router = require('express').Router(),
    { verifyUser } = require('../middlewares/auth'),
    { createKey, deleteKey, getAllKeys } = require('../controllers/keys');

router.post('/', verifyUser, createKey);
router.get('/', verifyUser, getAllKeys);
router.delete('/:id', verifyUser, deleteKey);

module.exports = router;