//  setting up action types
import keymirror from "keymirror";
export default keymirror({
  // user and Auth related
  SET_CURRENT_USER: null,
  GET_USER_DETAILS: null,
  LOGGED_IN: null,
  LOGGED_OUT: null,
  SET_REDIRECT_URL: null,

  // Project related action types
  CHANGE_PROJECT: null,
  ADD_PROJECT:null,
  DELETE_PROJECT: null,
  ADD_SERVER: null,
  REMOVE_SERVER: null,
  CHANGE_SERVER_KEY: null,

  //  Collborators operations
  ADD_COLLBORATORS: null,
  REMOVE_COLLABORATORS: null,
  CHANGE_COLLABORATOR_ROLE:null

});
