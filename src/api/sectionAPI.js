import axiosClient from "./axiosClient";

const sectionAPI = {
  create: (data) => {
    // data = {boardId: x}
    const url = "section";
    return axiosClient.post(url, data);
  },
  update: (sectionId, data) => {
    // data = {title: x, icon: x}
    const url = `section/${sectionId}`;
    return axiosClient.put(url, data);
  },
  updatePosition: (data) => {
    // data = {sections: [...]}
    const url = "section";
    return axiosClient.put(url, data);
  },
  delete: (sectionId) => {
    const url = `section/${sectionId}`;
    return axiosClient.delete(url);
  },
};

export default sectionAPI;
