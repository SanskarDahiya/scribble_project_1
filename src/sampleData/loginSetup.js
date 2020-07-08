import Axios from "axios";
// const serverUrl = "http://localhost:9797/";
const serverUrl = "https://scribble-back.herokuapp.com/";

export const validateLogin = async ({ username, password }) => {
  if (username && password) {
    return await fetch("user/validate", {
      username,
      password,
    });
  }
};

export const getUserByUserId = async (_id) => {
  return await fetch("user/getUserById", { _id });
};

export const createUser = async (user) => {
  return await fetch("user/create", { user });
};

export const sendMessage = async (data) => {
  if (data && data.to && data.message) {
    return await fetch("scribble/create", { ...data });
  }
};

export const getAllMessages = async (user) => {
  if (user) {
    return await fetch("scribble/getScribbleByUserId", { user });
  }
};
export const getScribbleMessages = async () => {
  return await fetch("scribble/getPublicScribbles");
};

const fetch = async (suffix, params = {}) => {
  const result = await Axios.post(serverUrl + suffix, params);
  const { data = [] } = result || {};
  if (data.error) {
    throw data.error;
  }
  return data;
};
