import React from "react";
import axios from "axios";

export default async function callAPI({ url, method, data, serverToken }: any) {
  let headers = {};

  if (serverToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serverToken}`,
    };
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);
  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data[0].message || "Internal Error",
      data: null,
    };
    console.log("services gagal ", res);

    return res;
  }

  const res = {
    error: false,
    message: "success",
    data: response.data,
  };
  console.log("services ", res);

  return res;
}
