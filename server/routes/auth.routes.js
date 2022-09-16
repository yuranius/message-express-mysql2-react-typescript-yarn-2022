const { Router } = require('express')

// библиотека для шифрования:
const bcrypt = require('bcryptjs')

// библиотека валидации email и password
const { check, validationResult } = require('express-validator')

// библиотека для авторизации пользователя по jwt token
const jwt = require('jsonwebtoken')

// подключаем config для получения jwsSecret
const config = require('config')

const router = Router()

const pool = require('../settings/db')

const c = require('config')

const authController = require('../controllers/auth-controller')


// переменные для запросов к БД
let tableOne = 'users'
let fieldOneTableOne = 'id'
let fieldTwoTableOne = 'email'
let fieldThreeTableOne = 'password'
let fieldFourTableOne = 'login'
let fieldFiveTableOne = 'registration'
let fieldSixTableOne = 'avatar'
let fieldTableOne = [ 
  fieldOneTableOne,
  fieldTwoTableOne,
  fieldThreeTableOne,
  fieldFourTableOne,
  fieldFiveTableOne,
  fieldSixTableOne,  
]



//api/auth/register
router.post('/register',
  // валидация:
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ], authController.register)


// /api/auth/login
router.post('/login',
  // валидация:
  [
    check('email', 'Введите корректный email').normalizeEmail({ gmail_remove_dots:false } ).isEmail(),
    check('password', 'Введите пароль').exists(), //пароль должен существовать
  ], authController.login)




module.exports = router
