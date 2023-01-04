import { UPDATE_USER, DELETE_USER } from "./../types";
import {
  deleteUserById,
  getAllUser,
  updateUser,
} from "./../../services/user-services";
import { createNewUser } from "../../services/user-services";
import { CREATE_NEW_USER, SET_MESSAGE, FETCH_LIST } from "../types";

export const fetchUserList = () => async (dispatch: any) => {
  const response = await getAllUser();
  dispatch({
    type: FETCH_LIST,
    payload: {
      data: response,
    },
  });
};

export const addNewUser = (data: any) => async (dispatch: any) => {
  const response = await createNewUser(data);
  if (response.error) {
    dispatch({
      type: SET_MESSAGE,
      payload: { isError: true, message: response.message },
    });
    return;
  }

  dispatch({
    type: CREATE_NEW_USER,
    payload: response.data,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: { isError: false, message: response.message, type: "ADD" },
  });
  return;
};

export const updateExistingUser =
  (userId: any, data: any) => async (dispatch: any) => {
    const response = await updateUser(userId, data);
    if (response.error) {
      dispatch({
        type: SET_MESSAGE,
        payload: { isError: true, message: response.message },
      });
      return;
    }

    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: { isError: false, message: response.message, type: "UPDATE" },
    });
    return;
  };

export const deleteUser = (userId: any) => async (dispatch: any) => {
  const response = await deleteUserById(userId);
  if (response.error) {
    dispatch({
      type: SET_MESSAGE,
      payload: { isError: true, message: response.message },
    });
    return;
  }

  dispatch({
    type: DELETE_USER,
    payload: { id: userId },
  });

  dispatch({
    type: SET_MESSAGE,
    payload: { isError: false, message: response.message, type: "DELETE" },
  });
  return;
};
