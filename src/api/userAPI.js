import axiosClient from "./axiosClient";

const userAPI = {
  register: (data) => {
    const url = "user/register";
    return axiosClient.post(url, data);
  },
  login: (data) => {
    const url = "user/login";
    return axiosClient.post(url, data);
  },
  verifyToken: () => {
    const url = "user/get-user-by-token";
    return axiosClient.get(url);
  },
  profile: (username) => {
    const url = `user/profile/${username}`;
    return axiosClient.get(url);
  },
  updateProfile: (data) => {
    const url = "user/profile";
    return axiosClient.put(url, data);
  },
  updateProfilePhoto: (data) => {
    const url = "user/profilephoto-upload";
    return axiosClient.put(url, data);
  },
  follow: (data) => {
    const url = "user/follow";
    return axiosClient.put(url, data);
  },
  followers: (username, queryParams) => {
    let url = "";
    if (queryParams) {
      url = `user/followers/${username}${queryParams}`;
    } else {
      url = `user/followers/${username}`;
    }
    return axiosClient.get(url);
  },
  following: (username, queryParams) => {
    let url = "";
    if (queryParams) {
      url = `user/following/${username}${queryParams}`;
    } else {
      url = `user/following/${username}`;
    }
    return axiosClient.get(url);
  },
  forgetPassword: (data) => {
    const url = "user/forget-password-token";
    return axiosClient.post(url, data);
  },
  resetPassword: (data) => {
    const url = "user/reset-password";
    return axiosClient.put(url, data);
  },
  changePassword: (data) => {
    const url = "user/change-password";
    return axiosClient.put(url, data);
  },
  changePrivateSetting: (data) => {
    const url = "user/change-private-setting";
    return axiosClient.put(url, data);
  },
  sendVerifyAccount: () => {
    const url = "user/verify-account-token";
    return axiosClient.post(url);
  },
  verifyAccount: (data) => {
    const url = "user/verify-account";
    return axiosClient.put(url, data);
  },
  sendFeedback: (data) => {
    const url = "user/send-feedback";
    return axiosClient.post(url, data);
  },
  popular: ()=>{
    const url = "user/popular";
    return axiosClient.get(url);
  },
  //// ADMIN
  banUser: (data) => {
    const url = "user/banning";
    return axiosClient.put(url, data);
  },
  getById: (data) => {
    const url = "user/get-by-id";
    return axiosClient.get(url, data);
  },
  getByEmail: (data) => {
    const url = "user/get-by-email";
    return axiosClient.get(url, data);
  },
};

export default userAPI;
