const router = require('express').Router();
const {
    validateAdminAuth,
    validateAdminActions
} = require('../middlewares/admin.middleware.js');
const {
    getAllUsers,
    approveResignation,
    deleteUser
} = require('../controllers/admin.controller.js');

// Admin routes
router.get('/users', validateAdminAuth, getAllUsers);
router.post('/resign/approve', [validateAdminAuth, validateAdminActions], approveResignation);
router.delete('/user/delete/:id', [validateAdminAuth, validateAdminActions], deleteUser);

module.exports = router;
