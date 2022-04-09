const router = require('express').Router()
const auth= require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
const userCtrl = require('../controllers/userCtrl')


router.post('/register',userCtrl.register)
router.post('/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/forgot', userCtrl.forgotPassword)
router.post('/reset', auth, userCtrl.resetPassword)
router.post('/google_login', userCtrl.googleLogin)
router.post('/facebook_login', userCtrl.facebookLogin)
router.get('/refresh_token', userCtrl.getAccessToken)
router.get('/logout', userCtrl.logout)
router.get('/infor', auth, userCtrl.getUserInfor)
router.patch('/update', auth, userCtrl.updateUser)

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

module.exports = router