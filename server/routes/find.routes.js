const { Router } = require('express')
const router = Router()
const findController = require ('../controllers/find-controllers')




// /api/find/

router.get('/users', findController.findPageAllUsers)
router.get('/friends', findController.findFriends)


module.exports = router
