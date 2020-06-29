import Axios from "axios";
const serverUrl = "http://localhost:5000/user/";
export const validateLogin = async ({ username = "", password = "" }) => {
  let resp = await Axios.get(serverUrl + "validateUser?username=" + username + "&password=" + password);
  return resp.data;
};
