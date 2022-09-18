const pool = require('../settings/db')
const config = require('config')
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    REQ_USERS, REQ_ID, REQ_EMAIL, REQ_PASS,
    REQ_LOGIN, REQ_REGISTRATION, REQ_AVATAR
} = require ('dotenv').config().parsed


class authController {
    // /api/auth/login
    async login(req, res) {
        try {

            //обработка валидации
            const errors = validationResult(req)

            //проверка на прохождении валидации
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректные данные при входе в систему',
                })
            }

            // получаем из request поля
            const {email, password} = req.body



            // ищем пользователя, если его нет, то залогинеться уже не можем

            const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                REQ_USERS,
                REQ_EMAIL,
                email
            ]).then((data) => {
                try {
                    return data[0][0];
                } catch (error) {
                    return false
                }
            })


            if (!user) {
                return res.status(400).json({massage: "Пользователь не найден"})
            }


            //? если пользователь найден, то необходимо проверить совпадают ли его пароли
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({massage: 'Неверный пароль'})
            }


            //создаем токен
            const token = jwt.sign(
                {
                    userId: user.id,
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h',
                }, // через сколько прекратит токен свое существование
            )


            res.status(200).json({
                token,
                userId: user.id,
                userLogin: user.login,
                avatar: user.avatar,
                massage: 'Успешно'
            })
        } catch (error) {
            res.status(500).json({massage: 'Что-то пошло не так, попробуйте снова'})
        }


    }

    //api/auth/register
    async register(req, res) {
        try {

            //обработка валидации
            const errors = validationResult(req)

            //проверка на прохождении валидации
            if (!errors.isEmpty()) {
                console.log('📌:', errors.errors[0].msg, '🌴 🏁')

                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректные данные при регистрации',
                })
            }
            const {email, password} = req.body


// проверка на существующего юзера
            const candidate = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                REQ_USERS,
                REQ_EMAIL,
                email
            ]).then((data) => {
                try {
                    return data[0][0].email;
                } catch (error) {
                    return false
                }
            })

            if (candidate) {
                return res.status(405).json({message: " Такой пользователь уже существует"})
            }


// в логин записываем то, что в email до символа @, для последующего редактирования самим пользователем
            let login = (email.split('@')[0])

// хешируем полученный пароль
            const hashedPassword = await bcrypt.hash(password, 12)
// когда пароль готов создаем пользователя

            await pool.query(`INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (NULL, ?, ?, ?, current_timestamp(),'')`, [
                REQ_USERS, REQ_ID, REQ_EMAIL, REQ_PASS, REQ_LOGIN, REQ_REGISTRATION, REQ_AVATAR,
                email, hashedPassword, login
            ]).then((data) => {
                // отвечаем фронтэнду
                res.status(201).json({massage: 'Пользователь создан, введите ваши данные и нажмите кнопку Войти'})
            })
        } catch (error) {
            res.status(500).json({massage: 'Что-то пошло не так, попробуйте снова'})
        }
    }
}


module.exports = new authController