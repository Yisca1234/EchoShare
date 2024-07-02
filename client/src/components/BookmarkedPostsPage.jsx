

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sidebar from './NavBar.jsx'
import BookmarkBar from './BookmarkBar.jsx'
import { isAuthenticated  } from '../redux/auth/selectors';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';


const BookmarkedPostsPage = () => {
  const navigate = useNavigate();

  const authenticated = useSelector(isAuthenticated);

  useEffect(() => {

    if(!authenticated){
      navigate('/login');
    }
    
  }, [authenticated]);
  const d = {
    image: 'Twitter-logo.png',
    name: 'nameOfChannel',
  };
  
  const repeatedArray = new Array(4).fill(d);
  const g= {
    comments: '986',
    qoutes: '37',
    likes: '4',
    bookmark: '34',
    views: '43'
  };
  const h= 'Twitter-logo.png';
  const j= 'theChannelName';
  const r='may 5';
  const k= "Israel, a small Middle Eastern nation, is a unique mix of ancient history and modern innovation. With landmarks like Jerusalem's Old City and the high-tech scene in Tel Aviv, it blends tradition with progress. The varied landscape, from lush hills to arid deserts, mirrors its diverse culture. Despite its size, Israel has a significant impact on technology and attracts millions of visitors to its religious and historical sites";
  const post= {
    profileImage: h,
    channelName: j,
    postDate: r,
    postContent: k,
    postImage: h,
    postData: g,
  }
  const repeatedArray1 = new Array(6).fill(post);
  return(
    <div className='row-container1 no-scroll'>
      < Sidebar/>
      <Container fluid className='main-section2'>
        <BookmarkBar />
      </Container>
    </div>
  )
};
export default BookmarkedPostsPage
