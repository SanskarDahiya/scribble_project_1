import Axios from "axios";
import { useAppStore } from "../stores/AppStore";
import { IUser } from "../types";
import getFingerprint from "./getFingerprint";
const handleTokens = async ({
  access_token,
  refresh_token,
  user,
}: {
  user: IUser;
  access_token: string;
  refresh_token: string;
}) => {
  useAppStore.getState().setIsLoading(false);
  useAppStore.getState().setUser(user);
  useAppStore.setState({ access_token, refresh_token });
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
};

export const validateLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const result = await fetch("/user/validate", { username, password });
  const { access_token, refresh_token, user } = result;
  await handleTokens({ access_token, refresh_token, user });
  return result;
};

export const handleSSOUser = async () => {
  try {
    const result = await fetch("/user", {});
    const { access_token, refresh_token, user } = result;
    if (access_token && refresh_token && user) {
      await handleTokens({ access_token, refresh_token, user });
    } else {
      useAppStore.getState().setIsLoading(false);
      useAppStore.getState().setUser(null);
      useAppStore.setState({ access_token: null, refresh_token: null });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  } catch (err) {
    useAppStore.getState().setIsLoading(false);
  }
};

export const createUser = async ({
  username,
  password,
  email,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const result = await fetch("/user/create", { username, password, email });
  const { access_token, refresh_token, user } = result;
  await handleTokens({ access_token, refresh_token, user });
  return result;
};

export const sendMessage = async (data: any) => {
  const result = await fetch("/scribble/create", { ...data });
  return result;
};

export const getAllMessages = async () => {
  const result = await fetch("/scribble", {});
  return result;
};

export const getPublicMessages = async () => {
  const result = await fetch("/scribble/getPublicScribbles", {});
  return result;
};

const fetch = async (url: string | URL, params: any) => {
  if (url instanceof URL) {
    url = url.href;
  } else {
    url = `/api${url}`;
  }
  const deviceInfo = useAppStore.getState().deviceInfo;
  let visitorId = deviceInfo?.deviceId || deviceInfo?.visitorId;
  try {
    if (!visitorId) {
      const res = await getFingerprint();
      useAppStore.getState().setDeviceInfo({ ...res, deviceId: res.visitorId });
      visitorId = res.visitorId;
    }
  } catch (err) {
    visitorId = "x-error-encounter";
  }
  let access_token = useAppStore.getState().access_token;
  if (!access_token) {
    access_token = localStorage.getItem("access_token") || null;
    const refresh_token = localStorage.getItem("refresh_token") || null;
    useAppStore.setState({ access_token, refresh_token });
  }

  const headers: any = {
    "x-platform": "web",
    "x-request-id": visitorId,
  };
  if (access_token) {
    headers["Authorization"] = access_token;
  }
  const result = await Axios({
    method: "post",
    url: url,
    data: params,
    headers: { ...headers },
  });
  const { data = [] } = result || {};
  if (data.error) {
    throw data.error;
  }
  return data;
};
