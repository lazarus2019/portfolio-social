import userAPI from "@/api/userAPI";
import tokenUtils from "@/utils/tokenUtils";
import { toast } from "react-toastify";
import getErrorMessage from "./getErrorMessage";

const authUtils = {
  isAuthenticated: async () => {
    const token = tokenUtils.getToken();
    if (!token) return false;

    try {
      const user = await userAPI.verifyToken();
      return user;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  },
};

export default authUtils;
