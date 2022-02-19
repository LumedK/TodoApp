const Router = require('express')
const AuthController = require('../controllers/auth.controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 50 }),
    AuthController.registration
)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)
router.get('/test', authMiddleware, AuthController.test)

module.exports = router
