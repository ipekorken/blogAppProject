import {
  SET_USERTOKEN,
  SET_USERINFO,
  SET_POSTS,
  SET_SEARCHEDPOSTS,
  SET_POSTINFO,
} from './types';

export const setUserToken = userToken => ({
  type: SET_USERTOKEN,
  payload: userToken,
});
export const setUserInfo = userInfo => ({
  type: SET_USERINFO,
  payload: userInfo,
});
export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
});
export const setSearchedPosts = searchedPosts => ({
  type: SET_SEARCHEDPOSTS,
  payload: searchedPosts,
});
export const setPostInfo = postInfo => ({
  type: SET_POSTINFO,
  payload: postInfo,
});
