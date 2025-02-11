import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/newPostSection.css'; 
import axios from 'axios';
import {ACCESS_KEY} from '../utils/fileSystemId.js'
import apiClient from '../utils/apiClient.js'
import {getAvatarName} from '../redux/user/selectors.js';
import {addUserPost} from '../redux/user/actions.js';


const NewPostSection = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [massage, setMassage] = useState({
    successReqMassage: null,
    failureReqMassage: null
  });
  let successReqMassage;
  let failureReqMassage;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const username = useSelector(getAvatarName);
  const api_key = "459359754131954"
  const cloud_name = "dojexlq8y"

  const handleTextChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    let photoData;
    e.preventDefault();
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
      
    }
    try{
      const response = await apiClient.post('/post/createNewPost', {username, postContent, photoData});
      await dispatch(addUserPost(response.data.post));
      setMassage({
        successReqMassage: 'the post created and saved succesfully',
        failureReqMassage: null});
      setTimeout(() => {
        navigate('/profile');
      }, 1800);
    } catch (e){

      setMassage({
        successReqMassage: null,
        failureReqMassage: e.response.data.massage})
    }


  };

  return (
    <div className="new-post-section">
      {username ? <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className='box1'
            as="textarea"
            rows={5}
            placeholder="Write your post here..."
            value={postContent}
            onChange={handleTextChange}
            required
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          {selectedImage && (
            <div className="image-preview mb-3">
              <Image src={URL.createObjectURL(selectedImage)} fluid />
              <Button variant="danger" onClick={handleImageRemove}>Remove</Button>
            </div>
          )}
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        </Form.Group>


        {massage.failureReqMassage && (
          <div className="text-danger text-center mt-3">
            {massage.failureReqMassage}
          </div>
        )}
        {massage.successReqMassage && (
          <div className="text-success text-center mt-3">
            {massage.successReqMassage}
          </div>
        )}
        <Button variant="primary" className='button3' type="submit">Publish</Button>
      </Form> :
      <div className='box8'>
        <h1>Hey Buddy</h1>
        <h3>I think you need first to create your channel</h3>
        {/* <a href='/profile'>do it here</a> */}
      </div>}
    </div>
  );
};

export default NewPostSection;
