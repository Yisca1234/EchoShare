import { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getFollowing} from '../redux/user/selectors.js';
import {handleFollow} from '../redux/user/actions.js'
import {getChannels} from '../redux/channel/actions.js';
import {popularChannels, randomChannels} from '../redux/channel/selectors.js';


const ChannelSuggestionSection = () => {
  const [isFollow, setIsFollow] = useState(new Array(8).fill(false));
  const userId = useSelector(getUserId);
  const popularChannelsList = useSelector(popularChannels);
  const randomChannelsList = useSelector(randomChannels);
  const listFollowing = useSelector(getFollowing);
  const idListOfChannels = [...popularChannelsList.map(obj => obj._id), ...randomChannelsList.map(obj => obj._id)];
  const isFollowing = idListOfChannels.filter(element => listFollowing.includes(element)? element : false);
  const dispatch = useDispatch();
  const cloud_name = "dojexlq8y";
  const handleFollowButton = async (idChannel, index) => {
    //console.log(index);
    await dispatch(handleFollow(userId, idChannel, !isFollow[index]));
    // await setIsFollow(prev => 
    //   prev.map((item, i) => 
    //     i === index ? !item : item
    //   )      
    // );
  };

  const fetchChannels = async () => {
    await dispatch(getChannels(userId));
  };
  
  useEffect( () => {
    fetchChannels();
  }, []);

  useEffect( () => {
    //console.log('hgh');
    isFollow.forEach((value, index) => {
      //console.log(idListOfChannels);
      
      if (value && !listFollowing.some(channel=> channel._id === idListOfChannels[index])) {
        setIsFollow(prevState => {
          const newState = [...prevState]; 
          newState[index] = false;          
          return newState;  
        });

      }
      if (!value && listFollowing.some(channel=> channel._id === idListOfChannels[index])) {
        setIsFollow(prevState => {
          const newState = [...prevState]; 
          newState[index] = true;          
          return newState;  
        });
      }
    });


  }, [listFollowing]);

  return (
    <Container className="border p-3 mt-4" style={{display: 'inline-block', height: '100vh'}}>
      <Row>
        <Col>
          <h5>Popular Channels</h5> 
        </Col>
      </Row>
      {popularChannelsList.map((channel, index) => (
        <Row className="align-items-center mt-2 line" key={index}>
          <Col xs={2}>
            <Image src={channel.avatar.imageLink ? `https://res.cloudinary.com/${cloud_name}/image/upload/${channel.avatar.imageLink}` : 'account.png'} style={{borderRadius: '50%', width: '55px', height: '55px', objectFit: 'cover' }} />
          </Col>
          <Col xs={7}>
            <strong className='someText'>{channel.avatar.username}</strong> {/* Channel name in bold */}
          </Col>
          <Col xs={3} className="text-end">
            <Button variant="primary" size="sm" onClick={()=>{handleFollowButton(channel._id, index)}}>{isFollow[index] ? 'UnFollow' : 'Follow'}</Button> 
          </Col>
        </Row>
      ))}

      <Row className="mt-4">
        <Col>
          <h5>Random Channels</h5> {/* Label for the second part */}
        </Col>
      </Row>
      {randomChannelsList.map((channel, index) => (
        <Row className="align-items-center mt-2 line" key={index}>
          <Col xs={2}>
            <Image src={channel.avatar.imageLink ? `https://res.cloudinary.com/${cloud_name}/image/upload/${channel.avatar.imageLink}` : 'account.png'} style={{borderRadius: '50%', width: '55px', height: '55px', objectFit: 'cover' }} />
          </Col>
          <Col xs={7}>
            <strong className='someText'>{channel.avatar.username}</strong> {/* Channel name in bold */}
          </Col>
          <Col xs={3} className="text-end">
            <Button variant="primary" size="sm" onClick={()=>{handleFollowButton(channel._id, (index+4))}}>{isFollow[index+4] ? 'UnFollow' : 'Follow'}</Button> 
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ChannelSuggestionSection;


    // isFollow.forEach((value, index) => {
    //   if (value && !listFollowing.includes(idListOfChannels[index])) {
    //     setIsFollow(prevState => {
    //       const newState = [...prevState]; 
    //       newState[index] = true;          
    //       return newState;  
    //     });
    //   }
    // });
    
    // isFollowing.map((id, index) => {
    //   if(id){
    //     setIsFollow(prevState => {
    //       const newState = [...prevState]; 
    //       newState[index] = true;          
    //       return newState;  

    //     });
    //   }
    // } );