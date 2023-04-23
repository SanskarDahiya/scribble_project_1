import { create } from "zustand";
import { IScribble, IUser } from "../types";
import { GetResult } from "@fingerprintjs/fingerprintjs";

interface IAppStore {
  access_token: string | null;
  refresh_token: string | null;
  user: null | IUser;
  setUser: (user: null | IUser) => void;
  deviceInfo: null | (GetResult & { deviceId: string });
  setDeviceInfo: (deviceInfo: any) => void;
  messages: IScribble[];
  setMessages: (messages: any) => void;
  messagesPublic: IScribble[];
  setMessagesPublic: (messagesPublic: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const store = (set: any) => ({
  access_token: null,
  refresh_token: null,
  user: null,
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setUser: (user: any) => set({ user }),
  deviceInfo: null,
  setDeviceInfo: (deviceInfo: any) => set({ deviceInfo }),
  messages: [],
  setMessages: (messages: IScribble[] | []) => set({ messages }),
  messagesPublic: [],
  setMessagesPublic: (messagesPublic: IScribble[] | []) =>
    set({ messagesPublic }),
});

export const useAppStore = create<IAppStore>(store);
