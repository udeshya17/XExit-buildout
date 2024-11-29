const router = require('express').Router();
const {
    validateRegInfo,
    validateLogInfo,
    validateResignInfo,
    auth
} = require('../middlewares/employee.middleware.js');
const {
    registerNewUser,
    loginUser,
    newUserResign,
    deleteResign
} = require('../controllers/employee.controller.js');

// Define routes
router.post('/auth/register', validateRegInfo, registerNewUser);
router.post('/auth/login', validateLogInfo, loginUser);
router.post('/user/resign', [auth, validateResignInfo], newUserResign);
router.delete('/user/resign', auth, deleteResign);

module.exports = router;
