const router = require('express').Router(),
    { signIn, signUp, deleteUser } = require('../controllers/user'),
    { verifyUser } = require('../middlewares/auth')


router.post('/', signUp);

router.delete('/', verifyUser, deleteUser);

router.post('/signin', signIn);

module.exports = router;