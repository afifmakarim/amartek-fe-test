import { FETCH_POST_LIST, CREATE_NEW_POST, SET_MESSAGE } from "./../types";
import { createNewPost, getUserPost } from "../../services/user-services";

export const fetchUserPost = (id: any) => async (dispatch: any) => {
  const response = await getUserPost(id);
  dispatch({
    type: FETCH_POST_LIST,
    payload: {
      data: response.data,
    },
  });
};

export const addNewPost = (userId: any, data: any) => async (dispatch: any) => {
  console.log(userId, data);
  const response = await createNewPost(userId, data);
  if (response.error) {
    dispatch({
      type: SET_MESSAGE,
      payload: { isError: true, message: response.message },
    });
    return;
  }

  dispatch({
    type: CREATE_NEW_POST,
    payload: response.data,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: { isError: false, message: response.message },
  });
  return;
};
