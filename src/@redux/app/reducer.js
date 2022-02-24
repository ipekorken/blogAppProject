import {
  SET_USERTOKEN,
  SET_USERINFO,
  SET_POSTS,
  SET_SEARCHEDPOSTS,
  SET_POSTINFO,
} from './types';

const initialState = {
  userToken: null,
  userInfo: null,
  posts: [],
  searchedPosts: [],
  postInfo: [],
};

const reducer = (state = initialState, action) => {
  const {type} = action;

  switch (type) {
    case SET_USERTOKEN:
      return {...state, userToken: action.payload};
      break;
    case SET_USERINFO:
      return {...state, userInfo: action.payload};
      break;
    case SET_POSTS:
      return {...state, posts: action.payload};
      break;
    case SET_SEARCHEDPOSTS:
      return {...state, searchedPosts: action.payload};
      break;
    case SET_POSTINFO:
      return {...state, postInfo: action.payload};
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
