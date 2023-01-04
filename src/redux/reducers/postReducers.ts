import { FETCH_POST_LIST, CREATE_NEW_POST } from "./../types";

let globalState = {
  postList: [],
  isError: null,
  message: null,
};

export const postReducers = (state = globalState, action: any) => {
  switch (action.type) {
    case FETCH_POST_LIST:
      return {
        ...state,
        postList: action.payload.data,
      };
    case CREATE_NEW_POST:
      return {
        ...state,
        postList: [action.payload, ...state.postList],
      };
    default:
      return state;
  }
};
