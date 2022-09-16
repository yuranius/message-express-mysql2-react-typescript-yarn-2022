const Router = require ('express')
const router = new Router


// api
router.use ('/auth', require('./auth.routes'))
router.use ('/profile', require('./profile.routes'))
router.use ('/find', require('./find.routes'))
router.use ('/friend', require('./friends.routes'))
router.use ('/massages', require('./messages.routes'))


module.exports = router