const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const authController = require('../controllers/auth-controller')
const bodyParserJson = require('body-parser').json();



const checkValidationRegister =
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ]

const checkValidationLogin =
    [
        check('email', 'Введите корректный email').normalizeEmail({gmail_remove_dots: false}).isEmail(),
        check('password', 'Введите пароль').exists()
    ]

// /api/auth/login
router.post('/login', bodyParserJson, checkValidationLogin, authController.login)
//api/auth/register
router.post('/register', bodyParserJson, checkValidationRegister, authController.register)


module.exports = router
