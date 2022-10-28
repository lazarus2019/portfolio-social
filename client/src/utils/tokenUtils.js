import keyStorage from "@/constants";

const tokenUtils = {
  getToken: () => {
    return localStorage.getItem(keyStorage.TOKEN_KEY)
      ? localStorage.getItem(keyStorage.TOKEN_KEY)
      : null;
  },
};

export default tokenUtils;
