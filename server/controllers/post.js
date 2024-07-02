const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');



const createNewPost = async (req, res) => {
  const { username, postContent, photoData } = req.body;

  let publicId;
  if(photoData){
    publicId = photoData.public_id;
  }
  else{
    publicId= null;
  }
  const user = await User.findOne({ 'avatar.username': username });
  //need to check that the public id is valid using the signature
  let post;

  if (user) {
    try {
      post = new Post({
        data: {
          text: postContent,
          img: {
            exists: !!publicId,
            imageLink: publicId || null,
          },
        },
        user: user._id,
      });
  
      await post.save();

      try {
        const updatedUser = await User.findOneAndUpdate(
          { 'avatar.username': username }, 
          { 
            $push: { 
              'avatar.posts': { 
                $each: [post], 
                $position: 0 
              } 
            } 
          },
          { new: true } 
        );
        
        
        if (updatedUser) {
          //console.log(updatedUser);
        } else {
          console.log('no user was found');
        }
      } catch (error) {
        console.error(`error during adding the id of the created osr to the user posts list: ${error}`);
      }
      

      // try{
      //   console.log('i am here');
      //   await User.findOneAndUpdate({ 'avatar.username': username }, { $push: {
          
      //     posts: {
      //        $each: [post],
      //        $position: 0
      //     }
      //  } });
      // } catch (error){
      //   return res
      //     .status(400)
      //     .send({ massage: `error during adding the id of the created osr to the user posts list: ${error}` });
      // }

    } catch (error) {
      return res
        .status(400)
        .send({ massage: `error saving the post: ${error}` });
    }

  } else {
    return res
      .status(400)
      .send({ massage: 'user of post is not found' });
  }




  res.status(200).json({
    post: post
  });
};

const getPosts = async (req, res) => {
  const {userId, limit, exclude, typeOfSort} = req.body;
  //console.log(userId, limit, exclude, typeOfSort);

  const excludeIds = !!exclude ? exclude.split(',') : [];
  if(typeOfSort==='foryou'){
    const posts = await Post.aggregate([
      { 
        $match: { 
          _id: { $nin: excludeIds.map(id => new mongoose.Types.ObjectId(id)) },
          user: { $ne: new mongoose.Types.ObjectId(userId) },
        } 
      },
      { $sample: { size: parseInt(limit, 10) } },
      {
        $lookup: {
          from: 'users', // name of the user collection
          localField: 'user', // field from the 'posts' collection
          foreignField: '_id', // field from the 'users' collection
          as: 'user' // field where the joined user data will be stored
        }
      }    
    ]);
    return res
      .status(200)
      .send({
        listOfPosts: posts,
        });
    
  } 
  if(typeOfSort==='following') {
    const user = await User.findById(userId).select('data.following').lean();
    const followingIds = user.data.following;
    const posts = await Post.aggregate([
      { 
        $match: { 
          _id: { $nin: excludeIds.map(id => new mongoose.Types.ObjectId(id)) },
          user: { $in: followingIds.map(id => new mongoose.Types.ObjectId(id)) }  // Exclude posts created by the specific user
        } 
      },
      { $sample: { size: parseInt(limit, 10) } },
      {
        $lookup: {
          from: 'users', // name of the user collection
          localField: 'user', // field from the 'posts' collection
          foreignField: '_id', // field from the 'users' collection
          as: 'user' // field where the joined user data will be stored
        }
      },    
    ]);
    return res
      .status(200)
      .send({
        listOfPosts: posts,
        });
  }
  return res.status(400).send({message:  `type of sort is not valid: ${typeOfSort}`})

      
}



const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findOneAndDelete(
      { _id: postId }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}

const handlePostLike = async (req, res) => {
  const {postId, userId, pressLike} = req.body;
  if(pressLike){
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { "data.likes": userId } },
      { new: true }
    );
    return res.status(200).json({ message: 'success' });
  } else {
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { "data.likes": userId } },
      { new: true }
    );
    
    return res.status(200).json({ message: 'success' });
  }
}



const handleincrementViews = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    await post.incrementViews();
    res.send({ message: 'success' });
    //res.send({ message: 'View count incremented', views: post.data.views });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  };
}

module.exports = { 
  createNewPost,
  getPosts,
  deletePost,
  handlePostLike,
  handleincrementViews,
};