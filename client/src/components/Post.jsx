
import { Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import { FaThumbsUp, FaComment, FaShare, FaEye, FaBookmark,FaQuoteRight, FaInfoCircle,FaFileAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {getFollowing, getUserId, getBookmaredPosts} from '../redux/user/selectors.js';
import { useState, useEffect } from 'react';
import {handleFollow, handleBookmark} from '../redux/user/actions.js'
import {handlePostLike} from '../redux/post/actions.js'
import {formatPostDate} from '../utils/formatPostDate.js';


const Post = (post) => {
  const [isFollow, setIsFollow] = useState(null)
  const [isActive, setIsActive] = useState({
    likeButton: false,
    commentButton: false,
    qouteButton: false,
    bookmarkButton: false,
    informationButton: false,
  });
  const { data, createdAt } = post;
  let user;
  if(post.user[0]){
    user = post.user[0];
  } else {
    user = post.user;
  }
  //const user = post.user[0];
  const postId = post._id;
  const listFollowing = useSelector(getFollowing);
  //console.log(user);
  const postDate = formatPostDate(createdAt);
  //const postDate = 'hfdj';
  //console.log(post);
  const {_id} = user;
  const dispatch = useDispatch();
  const bookmarkedListOfUser = useSelector(getBookmaredPosts);
  const idOfBookmarked = bookmarkedListOfUser.map((obj => obj._id));
  //console.log(idOfBookmarked);
  const isBookmarked= idOfBookmarked.length>0 ? idOfBookmarked.includes(postId)  : false;
  //console.log(idOfBookmarked);
  useEffect(() => {
    const checkIfFollowing = () => {
      const isFollowed = listFollowing.some(user => user._id === _id);
      if(isFollowed!=isFollow){
        setIsFollow(isFollowed);
      }
    };

    checkIfFollowing();
  }, [listFollowing]);  
  const cloud_name = "dojexlq8y"
  const {text, img, likes, comments, qoutes, views} = data;
  const {avatar} = user;
  let imgLinkPost;
  if(img.exists){
    imgLinkPost = `https://res.cloudinary.com/${cloud_name}/image/upload/${img.imageLink}`
  }
  const {username, imageLink}= avatar;
  let profileImage;
  const idFollower = useSelector(getUserId);
  const isLiked = likes.includes(idFollower);
  if(imageLink){
    profileImage= `https://res.cloudinary.com/${cloud_name}/image/upload/${imageLink}`;
  }
  else{
    profileImage= 'account.png';
  }

  useEffect(() => {

  }, []);  
  const handleFollowButton = async (idChannel) => {
    await dispatch(handleFollow(idFollower, idChannel, !isFollow)).then(
      await setIsFollow(pre=>!pre)
    )
  };

  const handlePostButtons = async (nameOfButton, conditionOfButton) => {
    switch (nameOfButton) {
      case 'likeButton': {
        await dispatch(handlePostLike(postId, idFollower, !conditionOfButton));
        break;
      }
      case 'commentButton': {
        console.log('commentButton');
        break;
      }
      case 'bookmarkButton': {
        await dispatch(handleBookmark(idFollower, postId, isBookmarked, _id))
        console.log('bookmarkButton');
        break;
      }
      case 'informationButton': {
        console.log('informationButton');
        break;
      }
      default: {
        console.log('Unknown button');
        break;
      }
    }
    setIsActive(prevState => ({
      ...prevState,
      [nameOfButton]: !conditionOfButton,
    }));
  };



  return (

    <Container className="mt-4 border p-3">
      <div >
        <div xs={2} className='con'>
          <Image src={profileImage} fluid  style={{borderRadius: '50%', width: '35px', height: '35px', objectFit: 'cover' }}/>
        </div>
        <div xs={10} className="text-muted con"  >
          <strong>{username}</strong> &middot; {postDate}
        </div>
        <Col xs={3} className='con' >
          <Button variant="primary" size="sm" onClick={()=>{handleFollowButton(_id)}}>{isFollow ? 'UnFollow' : 'Follow'}</Button> 
        </Col>
      </div>

      <Row className="mt-2">
        <Col>
          <p>{text}</p>
        </Col>
      </Row>

      {img.exists && <Row>
        <Col>
          <Image src={imgLinkPost} fluid />
        </Col>
      </Row>}

      <Row className="mt-3 justify-content-around text-center">
        <Col className={`pointer ${isLiked && 'active1'}`} onClick={()=>{handlePostButtons('likeButton',isLiked)}}>
          <FaThumbsUp /> {likes.length}
        </Col>
        <Col className={`pointer ${isActive.commentButton && 'active1'}`}>
          <FaComment /> {comments.length}
        </Col>
        <Col className={`pointer ${isActive.qouteButton && 'active1'}`}>
          <FaQuoteRight /> {qoutes.length}
        </Col>
        <Col >
          <FaEye /> {views}
        </Col>
        <Col className={`pointer ${isBookmarked && 'active1'}`} onClick={()=>{handlePostButtons('bookmarkButton',isBookmarked)}}>
          <FaBookmark />
        </Col>
        <Col className={`pointer ${isActive.informationButton && 'active1'}`}>
          <FaFileAlt /> 
        </Col>
      </Row>
    </Container>
  );
}

export default Post;
