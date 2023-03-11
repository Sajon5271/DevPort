const router = require('express').Router();
const profileController = require('./controllers/profile');
const userController = require('./controllers/user');

router.get('/dashboard', profileController.getAllProfiles);
router.put('/dashboard', profileController.updateProfile);
router.get('/dashboard/:id', profileController.getSingleProfile);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// router.put('/todos/:id/done', taskController.taskDone);

module.exports = router;
