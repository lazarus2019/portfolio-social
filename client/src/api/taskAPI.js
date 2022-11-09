import axiosClient from "./axiosClient";

const taskAPI = {
  create: (boardId, data) => {
    // data = {sectionId: x}
    const url = `task/${boardId}`;
    return axiosClient.post(url, data);
  },
  update: (taskId, data) => {
    // data = {title: x, icon: x, content: x, isDone: x}
    const url = `task/${taskId}`;
    return axiosClient.put(url, data);
  },
  updatePosition: (boardId, data) => {
    // data = {resourceList: x, destinationList: x, resourceSectionId: x, destinationSectionId: x}
    const url = `task/update-position/${boardId}`;
    return axiosClient.put(url, data);
  },
  delete: (taskId) => {
    const url = `task/${taskId}`;
    return axiosClient.delete(url);
  },
};

export default taskAPI;
