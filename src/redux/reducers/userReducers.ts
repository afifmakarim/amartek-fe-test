import { DELETE_USER } from "./../types";
import {
  CREATE_NEW_USER,
  SET_MESSAGE,
  FETCH_LIST,
  CLEAR_ERROR,
  UPDATE_USER,
} from "../types";

let globalState = {
  userList: [],
  isError: null,
  message: null,
  type: null,
};

export const userReducers = (state = globalState, action: any) => {
  switch (action.type) {
    case FETCH_LIST:
      return {
        ...state,
        userList: action.payload.data,
      };
    case CREATE_NEW_USER:
      return {
        ...state,
        userList: [action.payload, ...state.userList],
      };
    case UPDATE_USER:
      return {
        ...state,
        userList: state.userList.map((item: any) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter(
          (item: any) => item.id !== action.payload.id
        ),
      };
    case SET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        isError: null,
        message: null,
        type: null,
      };

    default:
      return state;
  }
};
