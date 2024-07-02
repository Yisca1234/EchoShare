const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getUser,
  createUser,
  handleAvatar,
  handleFollow,
  getChannelsHome,
  handleBookmark,
} = require('../controllers/user');

const router = express.Router();


router.post('/createAvatar', auth, handleAvatar);
router.put('/updateAvatar', auth, handleAvatar);
router.put('/follow', auth, handleFollow);
router.put('/bookmark', auth, handleBookmark);
router.post('/getChannelsHome',auth, getChannelsHome);
// router.post('/:username',auth, createUser);

// router.post('/avatar', auth, updateUserAvatar);
// router.patch('/avatar', auth, removeUserAvatar);

module.exports = router;
