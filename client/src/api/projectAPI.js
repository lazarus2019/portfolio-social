import axiosClient from "./axiosClient";

const projectAPI = {
  create: (data) => {
    // Add thumbnail to form-data
    const url = "project/create";
    return axiosClient.post(url, data);
  },
  getOwnProjects: () => {
    const url = "project";
    return axiosClient.get(url);
  },
  getByUsername: (username) => {
    const url = `project/${username}`;
    return axiosClient.get(url);
  },
  getBySlug: (slug) => {
    const url = `project/s/${slug}`;
    return axiosClient.get(url);
  },
  getById: (projectId) => {
    const url = `project/p/${projectId}`;
    return axiosClient.get(url);
  },
  delete: (data) => {
    const url = "project/delete";
    return axiosClient.delete(url, data);
  },
  update: (data) => {
    const url = "project/update";
    return axiosClient.put(url, data);
  },
  // Save/Unsave
  saving: (data) => {
    const url = "project/saved";
    return axiosClient.put(url, data);
  },
  getSavedProjects: () => {
    const url = "project/saved";
    return axiosClient.get(url);
  },
  // Hide/Unhide
  hide: (data) => {
    const url = "project/hide";
    return axiosClient.put(url, data);
  },
  updateThumbnail: (data) => {
    const url = "project/update-thumbnail";
    return axiosClient.put(url, data);
  },
  uploadPreviewVideo: (data) => {
    const url = "project/preview-video";
    return axiosClient.put(url, data);
  },
  delete: (data) => {
    const url = "project/delete";
    return axiosClient.delete(url, data);
  },
  update: (data) => {
    const url = "project/update";
    return axiosClient.put(url, data);
  },
  //// ADMIN
  getAll: () => {
    const url = "project/all";
    return axiosClient.get(url);
  },
};

export default projectAPI;
