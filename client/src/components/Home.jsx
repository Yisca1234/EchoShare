import Sidebar from './NavBar.jsx'
import ContentSection from './ForyouOrFollowing.jsx'
import Search from './SearchSection.jsx'
import ChannelSuggestionSection from './ChannelSuggestionSection.jsx'
import { useEffect, useState } from 'react'
import { userRequest } from '../redux/user/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail  } from '../redux/auth/selectors';
import { getUserId } from '../redux/user/selectors';
import axios from 'axios'
import { getAllPosts } from '../redux/post/actions.js';
import { Link, useNavigate } from 'react-router-dom';
import {  Modal,Form, Button} from 'react-bootstrap';
import apiClient from '../utils/apiClient.js'
import { selectAuthError,isAuthenticated  } from '../redux/auth/selectors';





const Home = () => {
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useremail = useSelector(getUserEmail);
  const authenticated = useSelector(isAuthenticated);
  const userId = useSelector(getUserId);
  useEffect(() => {

    if(!authenticated){
      navigate('/login');
    }
    
  }, [authenticated]);

  // useEffect(() => {
  //   try{
  //     dispatch(getAllPosts(userId));

  //   } catch{
      
  //   }
  // }, []);

    const d = {
      image: 'Twitter-logo.png',
      name: 'nameOfChannel',
    };
    
    const repeatedArray = new Array(4).fill(d);
  return(
    <div className='row-container no-horizontal-scroll'>
      
      < Sidebar/>
      < ContentSection />
      <div className='column-container' style={{display: 'inline-block',width: '37%' , position: 'fixed', top: '0', right: '0', marginRight: '10px'}}>
        < Search />
        < ChannelSuggestionSection />
      </div>
    </div>
  )
};
export default Home


{/* {modelShow && (
      <Modal show={modelShow}  >
        <Modal.Header>
          <Modal.Title>Details required for initial registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" onChange={handleChange} placeholder="Enter email" name='email'/>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSaveStart}>
            Save and Start
          </Button>
        </Modal.Footer>
      </Modal>)} */}
      //const [modelShow, setModelShow] = useState(false);
// const [formData, setFormData] = useState({
  //   email: '',
  // });
      // async function requestFunction() {
    //   
    //   // const response = await axios.get(`http://localhost:5000/api/user/${username}`);
    //   // if(response?.data?.message ==='Avatar needs to be create'){
    //   //   
    //   //   setModelShow(true);
        
    //   // }
    //   // else{
    //   //   // call the function that take the detailes of the user so the home page can be displayed.
    //   //   // getUser();
    //   // }
      
    // } 
    // const handleSaveStart = async (e) =>{
    //   e.preventDefault();
    //   const response = await apiClient.post(`/user/${username}`, {formData});
    //   await dispatch(userRequest(response));
    //   setModelShow(false);
  
    // };
  
    // const handleChange = (e) => {
    //   setFormData({
    //     ...formData,
    //     [e.target.name]: e.target.value,
    //   });
    // };
  

    // const g= {
    //   comments: '986',
    //   qoutes: '37',
    //   likes: '4',
    //   bookmark: '34',
    //   views: '43'
    // };
    // const h= 'Twitter-logo.png';
    // const j= 'theChannelName';
    // const r='may 5';
    // const k= "Israel, a small Middle Eastern nation, is a unique mix of ancient history and modern innovation. With landmarks like Jerusalem's Old City and the high-tech scene in Tel Aviv, it blends tradition with progress. The varied landscape, from lush hills to arid deserts, mirrors its diverse culture. Despite its size, Israel has a significant impact on technology and attracts millions of visitors to its religious and historical sites";
    // const post= {
    //   profileImage: h,
    //   channelName: j,
    //   postDate: r,
    //   postContent: k,
    //   postImage: h,
    //   postData: g,
    // }
    // const repeatedArray1 = new Array(6).fill(post);
  // if(!avatarExists){
    //   setModelShow(true);
    // }
    // useEffect(() => {
    //   if(!selectUserError){
    //     navigate('/login');
    //   }
    // }, [currentUser]);