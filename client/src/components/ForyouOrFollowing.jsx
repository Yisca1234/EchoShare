import { Container, Nav } from 'react-bootstrap';
import Post from './Post.jsx'; 
import '../styles/CustomScrollbar.css'; 
import { allPostsSelector } from '../redux/post/selectors.js';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { getAllPosts } from '../redux/post/actions.js';
import {getUserId} from '../redux/user/selectors.js'
import { useInView } from 'react-intersection-observer';


const ContentSection = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [typeOfSortOfSection, setTypeOfSortOfSection] = useState('foryou');
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const dispatch = useDispatch();
  // const containerRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [typeOfSortOfSection]);

  const allPosts = useSelector(allPostsSelector);
  const userId = useSelector(getUserId);

  const fetchPosts = async () => {
    //setLoading(true);
    const exclude = allPosts[typeOfSortOfSection].length === 0 ? null : allPosts[typeOfSortOfSection].map(post => post._id).join(',');
    //console.log(exclude);
    await dispatch(getAllPosts(userId, 10, exclude, typeOfSortOfSection));
    //setLoading(false);
  };

  useEffect(() => {
    if (inView) {
      console.log('Div is in view!');
      fetchPosts();
      // Add your custom function logic here
    }
  }, [inView]);

  // const handleScroll = async () => {
  //   const container = containerRef.current;
  //   if (
  //     container.scrollTop + container.clientHeight >= container.scrollHeight - 200 &&
  //     !loading
  //   ) {
  //     // setLoading(true);
  //     await fetchPosts();
  //     // setLoading(false);
  //   }
  // };

  const handleForYou = async () => {
    setTypeOfSortOfSection('foryou');
  };

  const handleFollowing = async () => {
    setTypeOfSortOfSection('following');
  };

  // useEffect(() => {
  //   const container = containerRef.current;
  //   container.addEventListener('scroll', handleScroll);
  //   return () => {
  //     container.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);
  //console.log(allPosts[typeOfSortOfSection]);
  return (
    <Container 
      className="border custom-scroll contentBar" 
      style={{ 
        backgroundColor: 'white', 
        width: '50%', 
        display: 'inline-block', 
        marginBottom: '300px', 
        marginRight: '38%', 
        overflowY: 'auto'
      }}
    >
      <Nav variant="tabs" className="fixed-nav"> {/* Sticky navbar */}
        <Nav.Item 
          className={`navItem ${typeOfSortOfSection === 'foryou' ? 'active2' : ''}`} 
          style={{ borderRight: '1px solid lightgray' }} 
          onClick={handleForYou}
        >
          <Nav.Link>
            For You
          </Nav.Link>
        </Nav.Item>
        <Nav.Item 
          className={`navItem ${typeOfSortOfSection === 'following' ? 'active2' : ''}`} 
          onClick={handleFollowing}
        >
          <Nav.Link>
            Following
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="post-list">
        {loading ? (
          <h1>Loading more posts...</h1>
        ) : (
          <div>
            {allPosts[typeOfSortOfSection] && allPosts[typeOfSortOfSection].length > 0 ? (
              <>
                {allPosts[typeOfSortOfSection].map((post, index) => (
                  <div className="post-margin postOfList" key={index}>
                    <Post {...post} />
                  </div>
                ))}
                <div className='box10' ref={ref}>preparing more posts for you...</div>
              </>
            ) : (
              <h1>have no posts</h1>
            )}
          </div>
        )}
      </div>
    </Container>
  );
  
};

export default ContentSection;
