const Router = require('express')
const authController = require('../controllers/auth.controller')
const { body } = require('express-validator')

const router = new Router()

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 50 }),
    authController.registration
)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/test', authController.test)

module.exports = router
