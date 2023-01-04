import axios from "axios";
import callAPI from "../config";

const URL = {
  GET_ALL_USER: "https://gorest.co.in/public/v2/users",
  CREATE_NEW_USER: "https://gorest.co.in/public/v2/users",
};

const API_TOKEN =
  "7acb3fc9a851796ea5ae2d4e9ef6690b494433d864a87988adb377eb973a6898";

export const getAllUser = async () => {
  const response = await axios.get(URL.GET_ALL_USER, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const axiosResponse = response.data;
  return axiosResponse;
};

export const createNewUser = async (data: any) => {
  return callAPI({
    url: URL.GET_ALL_USER,
    method: "POST",
    data,
    serverToken: API_TOKEN,
  });
};

export const updateUser = async (userId: any, data: any) => {
  console.log(userId, data);
  return callAPI({
    url: `${URL.GET_ALL_USER}/${userId}`,
    method: "PUT",
    data,
    serverToken: API_TOKEN,
  });
};

export const getUserPost = async ({ userId }: any) => {
  return callAPI({
    url: `https://gorest.co.in/public/v2/users/${userId}/posts`,
    method: "GET",
    serverToken: API_TOKEN,
  });
};

export const createNewPost = async (userId: any, data: any) => {
  return callAPI({
    url: `https://gorest.co.in/public/v2/users/${userId}/posts`,
    method: "POST",
    data,
    serverToken: API_TOKEN,
  });
};

export const getUserDetailById = async (userId: any) => {
  return callAPI({
    url: `https://gorest.co.in/public/v2/users/${userId}`,
    method: "GET",
    serverToken: API_TOKEN,
  });
};

export const deleteUserById = async (userId: any) => {
  return callAPI({
    url: `https://gorest.co.in/public/v2/users/${userId}`,
    method: "DELETE",
    serverToken: API_TOKEN,
  });
};
