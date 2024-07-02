import Sidebar from './NavBar.jsx'
import ChannelDetailsBar from './ChannelDetailsBar.jsx'
import PostsOfUserSection from './PostsOfUserSection.jsx'
import BottomProfileSection from './BottomProfileSection.jsx'
import { Container, Row, Col, Image, Button, Modal, Form , } from 'react-bootstrap';
import { isAuthenticated  } from '../redux/auth/selectors';
import { useEffect, useState } from 'react'
import {createAvatar} from '../redux/user/actions.js'
import {  getUserId , isAvatar } from '../redux/user/selectors';
import apiClient from '../utils/apiClient.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {

  const [modelShow, setModelShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [formData, setFormData] = useState({
  //   username: '',
  //   image: null,
  //   description: '',
  //   phone: '',
  // });
  const navigate = useNavigate();
  const isavatar = useSelector(isAvatar);
  const authenticated = useSelector(isAuthenticated);
  const userId = useSelector(getUserId);
  const api_key = "459359754131954";
  const cloud_name = "dojexlq8y";
  const dispatch = useDispatch();

  useEffect(() => {

    if(!authenticated){
      navigate('/login');
    }
    
  }, [authenticated]);

  useEffect(() => {

    if(!isavatar){
      setModelShow(true);
    }
  }, []);

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoData=null;
    if(selectedImage){
      const signatureResponse = await apiClient.get('/get-signature');
      const data = new FormData()
      data.append("file", selectedImage)
      data.append("api_key", api_key)
      data.append("signature", signatureResponse.data.signature)
      data.append("timestamp", signatureResponse.data.timestamp)
      
      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },

        })
      photoData = {
        public_id: cloudinaryResponse.data.public_id,
        signature: cloudinaryResponse.data.signature
      };  
      // setFormData({
      //   ...formData,
      //   image: photoData,
      // });    
    }
    try{
      const formData = {
        username: e.target.elements['username'].value,
        image: photoData,
        description: e.target.elements['description'].value,
        phone: e.target.elements['phone'].value,
      }
      console.log(formData);
      //debugger
      
      await dispatch(createAvatar(formData, userId));
      setModelShow(false);
    } catch (e){
      console.log(e);
      navigate('/home');
    }
  }

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
  const k= "Israel, a small Middle Eastern nation";
  const post= {
    profileImage: h,
    channelName: j,
    postDate: r,
    postContent: k,
    postImage: h,
    postData: g,
  }
  const repeatedArray = new Array(4).fill(post);
  const repeatedArray1 = new Array(18).fill(k);
  return(
    <div className='row-container1 no-scroll'>
      {modelShow && (
      <Modal show={modelShow}  >
        <Modal.Header>
          <Modal.Title>A few details so you can start say your voice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="formUsername">
              <Form.Label>The name of my channel</Form.Label>
              <Form.Control required type="text" name='username'/>
            </Form.Group>

            <Form.Group className='mt-3'>
              {selectedImage && (
                <div className="profile-image-wrapper">
                  <Image src={URL.createObjectURL(selectedImage)} fluid />
                  <Button variant="danger" onClick={handleImageRemove}>Remove</Button>
                </div>
              )}
              <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group controlId="formUserdescription">
              <Form.Label>Short description about my channel</Form.Label>
              <Form.Control type="text" name='description'/>
            </Form.Group>

            <Form.Group controlId="formUserphone">
              <Form.Label>my phone</Form.Label>
              <Form.Control type="text" name='phone'/>
            </Form.Group>

            <Button variant="secondary" type='submit'>
              Save, I am ready to say my voice!
            </Button>
            
            {/* <Form.Group controlId="formUserimage">
              <Form.Label>The image of the channel</Form.Label>
              <Form.Control type="text" onChange={handleChange} name='imageLink'/>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          
        </Modal.Footer> */}
      </Modal>)}
      < Sidebar/>
      {isavatar && <Container fluid className='main-section1'>
        <Row>
          <Col xs={6}>
            <div className='fullheight section2'>
              <ChannelDetailsBar />
              <BottomProfileSection />
            </div>
          </Col>
          <Col xs={6}>
            <div>
              <PostsOfUserSection />
            </div>
          </Col>
        </Row>
      </Container>}
    </div>
  )
};
export default Profile