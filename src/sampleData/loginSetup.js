import Axios from "axios";
import dotenv from "dotenv";
const serverUrl = "https://scribble-back.herokuapp.com/"; //"http://localhost:9797/";
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

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
  try {
    return await fetch("user/create", { user });
  } catch (err) {
    alert(err.message);
    throw err;
  }
};

export const sendMessage = async (data) => {
  if (data && data.to && data.message) {
    return await fetch("scribble/create", { ...data });
  }
};

export const getAllMessages = async (user) => {
  if (user && user._id) {
    return await fetch("scribble/getScribbleByUserId", user);
  }
};

const fetch = async (suffix, params) => {
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  var result11 = dotenv.config();
  if (result11.error) {
    console.log(result11.error, "<<<ERROR ENCOUNTER");
  }
  console.log(result11.parsed, "<<<Result Present");
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

  const result = await Axios.post(serverUrl + suffix, params);
  const { data = [] } = result || {};
  if (data.error) {
    throw data.error;
  }
  return data;
};
