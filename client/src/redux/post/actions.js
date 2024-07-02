import {
  GET_ALL_POSTS,
  SUCCESS_GET_POSTS,
  FAILURE_GET_POSTS,
  SUCCESS_LIKE_REMOVED,
  SUCCESS_LIKE_ADDED,
  LOGOUT,
} from './actionTypes';
import axios from 'axios';
import apiClient from '../../utils/apiClient.js'


export const logout1 = () => ({
  type: LOGOUT,
});

export const getPostsSuccess = (posts, typeOfSort) => ({
  type: SUCCESS_GET_POSTS,
  payload: { posts, typeOfSort },
});

export const getPostsFailure = (error) => ({
  type: FAILURE_GET_POSTS,
  payload: { error },
});

export const postAddLike = (postId, userId) => ({
  type: SUCCESS_LIKE_ADDED,
  payload: { postId, userId },
});

export const postRemoveLike = (postId, userId) => ({
  type: SUCCESS_LIKE_REMOVED,
  payload: { postId, userId },
});



export const getAllPosts = (userId, limit, exclude, typeOfSort) => async (dispatch) =>{
  //console.log(userId, limit, exclude, typeOfSort);
  const response = await apiClient.post('/post',{ userId, limit, exclude, typeOfSort });
  //console.log(typeOfSort);
  await dispatch(getPostsSuccess(response.data.listOfPosts, typeOfSort));
  // dispatch(getPostsFailure(e));
}

export const handlePostLike = (postId, userId, pressLike) => async (dispatch) =>{
  const response = await apiClient.put('/post/like', { postId, userId, pressLike });
  if(response.data.message ==='success'){
    if(pressLike){
      await dispatch(postAddLike(postId, userId));
    }
    else {
      await dispatch(postRemoveLike(postId, userId));
    }
  } else {
    console.log('error');
  }

}