const router = require('express').Router();
const oauthController = require('./controllers/oauth');
const profileController = require('./controllers/profile');
const userController = require('./controllers/user');
const authMiddleware = require('./middleware/auth');

router.get('/dashboard', profileController.getAllProfiles);
router.put('/dashboard', authMiddleware, profileController.updateProfile);
router.get('/dashboard/:id', profileController.getSingleProfile);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/skills', profileController.getAllSkills);
router.post('/githubAccessCode', oauthController.githubAccessCode);
router.post('/oauthLogin', userController.oauthLogin);

module.exports = router;
