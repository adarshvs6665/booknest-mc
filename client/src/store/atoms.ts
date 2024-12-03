import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { SESSION_STORAGE_USER_KEY } from "../constants";
import { ToastOptions, User } from "../types";
import { atom } from "jotai";

export const storage = createJSONStorage<any>(() => sessionStorage);

const getDefaultValue = () => {
  const user = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as User;
  } catch (e: any) {
    return null;
  }
};

export const userAtom = atomWithStorage<User | null>(
  SESSION_STORAGE_USER_KEY,
  getDefaultValue(),
  storage
);

export const toastOptionsAtom = atom<ToastOptions>({
  open: false,
  message: "",
  severity: "info",
});
