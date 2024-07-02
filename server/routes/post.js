const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getPosts,
  createNewPost,
  deletePost,
  handlePostLike,
  handleincrementViews,
} = require('../controllers/post');
// const {
//   postComment,
//   deleteComment,
//   updateComment,
//   postReply,
//   deleteReply,
//   updateReply,
// } = require('../controllers/postComment');
// const {
//   upvoteComment,
//   downvoteComment,
//   upvoteReply,
//   downvoteReply,
// } = require('../controllers/commentVote');

const router = express.Router();

router.post('/',auth, getPosts);
router.post('/createNewPost', auth, createNewPost);
router.delete('/deletePost/:postId', auth, deletePost);
router.put('/like', auth, handlePostLike);
router.post('/post/:id/view', auth, handleincrementViews)


module.exports = router;

// router.get('/search', getSearchedPosts);
// router.get('/:id/comments', getPostAndComments);
// router.get('/subscribed', auth, getSubscribedPosts);
// router.patch('/:id', auth, updatePost);
// router.delete(':id', auth, deletePost);

// //posts vote routes
// router.post('/:id/upvote', auth, likePost);

// //post comments routes
// router.post('/:id/comment', auth, postComment);
// router.delete('/:id/comment/:commentId', auth, deleteComment);
// router.patch('/:id/comment/:commentId', auth, updateComment);
// router.post('/:id/comment/:commentId/reply', auth, postReply);
// router.delete('/:id/comment/:commentId/reply/:replyId', auth, deleteReply);
// router.patch('/:id/comment/:commentId/reply/:replyId', auth, updateReply);

// //comment vote routes
// router.post('/:id/comment/:commentId/upvote', auth, upvoteComment);
// router.post('/:id/comment/:commentId/reply/:replyId/upvote', auth, upvoteReply);
