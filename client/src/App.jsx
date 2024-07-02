import Login from './components/Login.jsx'
import './App.css'
import './styles/CustomScrollbar.css'
import './styles/search.css'
import SignUp from './components/SignUp.jsx'
import Sidebar from './components/NavBar.jsx'
import Post from './components/Post.jsx'
import AppRoutes from './Routes.jsx'
import ChannelSuggestionSection from './components/ChannelSuggestionSection.jsx'
import SearchSection from './components/SearchSection.jsx'
import ContentSection from './components/ForyouOrFollowing.jsx'


function App() {
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
  return(<>
    {/* <ChannelSuggestionSection popularChannels={repeatedArray} randomChannels={repeatedArray} />   */}
    {/* <SearchSection onSearch={h}/> */}
    {/* <img style={{borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover' }} src="Twitter-logo.png" alt="" /> */}
    {/* <ContentSection forYouPosts={repeatedArray1} followingPosts={repeatedArray1} /> */}
    {/* <Sidebar /> */}
    <AppRoutes />
  </>)
}



export default App
