const Router = require ('express')
const pool = require("../settings/db");
const router = new Router


// api
router.use ('/auth', require('./auth.routes'))
router.use ('/profile', require('./profile.routes'))
router.use ('/find', require('./find.routes'))
router.use ('/friend', require('./friends.routes'))
router.use ('/massages', require('./messages.routes'))

// api/user (для тестирования)
router.get('/user', async (req, res) => {
    try {
        pool.query('SELECT * FROM users').then((data) => {
            res.status(200).json(data[0])
        })
    } catch (error) {
        console.log('📢', error, 'Запрос не удался')
    }
})

module.exports = router