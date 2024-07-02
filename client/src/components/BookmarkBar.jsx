import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import Post from './Post.jsx'; 
import '../styles/CustomScrollbar.css'; 
import { getBookmaredPosts } from '../redux/user/selectors.js';


const BookmarkBar = () => {

  const listPosts= useSelector(getBookmaredPosts);
  return (
    <Container className="box5 container1">
      {listPosts.length > 0 ? (
        <div className="post-list">
          {listPosts.map((post, index) => (
            <div className="post-margin postOfList" key={index}>
              <Post {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="box10">
          <h3>I don't see you saved some posts in your drawer</h3>
          {/* <a href="/home">Go see interesting posts to bookmark</a> */}
        </div>
      )}
    </Container>
  );
  
  
};

export default BookmarkBar;