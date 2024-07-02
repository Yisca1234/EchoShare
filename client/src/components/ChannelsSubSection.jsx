import { useDispatch, useSelector } from 'react-redux';
import Channel from './Channel.jsx'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { getFollowing } from '../redux/user/selectors.js';


const ChannelsSubSection = () => {
  const subChannels= useSelector(getFollowing);

  return (
    
    <Container className="container1 box5 box6" >
      <div className="">
        {subChannels.map((channel, index) => (
        <div className="post-margin postOfList" key={index}> 
          <Channel {...channel}/>
        </div>
        ))}
      </div>
    </Container>
    
  );
};

export default ChannelsSubSection;