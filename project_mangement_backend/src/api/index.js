const router = require('express').Router();

const userRoute = require('./user/user.route');
const authRoute = require('./auth/auth.route');
const projectRoute = require('./project/project.route');

router.use('/auth', authRoute);
router.use('/project', projectRoute);
router.use('/user', userRoute);

module.exports = router;
