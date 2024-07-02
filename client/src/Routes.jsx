import Login from './components/Login.jsx'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import SignUp from './components/SignUp.jsx'
import Profile from './components/ProfilePage.jsx'
import CreatePostPage from './components/CreatePost.jsx'
import BookmarkedPostsPage from './components/BookmarkedPostsPage.jsx'
import SubChannelsPage from './components/SubChannelsPage.jsx'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createNewPost" element={<CreatePostPage />} />
      <Route path="/bookmarkedPosts" element={<BookmarkedPostsPage />}/>
      <Route path="/subscribedChannelsList" element={<SubChannelsPage />} />
      {/*   
      
      <Route path="*" element={<NotFound />} />  */}
    </Routes>
  );
};

export default AppRoutes;
