import Axios from "axios";
const serverUrl = "http://localhost:9797/";
export const validateLogin = async ({ username = "", password = "" }) => {
  let resp = await Axios.get(serverUrl + "user/validateUser?username=" + username + "&password=" + password);
  return resp.data;
};

export const getUserByUserId = async (_id) => {
  let resp = await Axios.post(serverUrl + "user/getUserById", { _id });
  return resp.data;
};
