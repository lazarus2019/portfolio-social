import axiosClient from "./axiosClient";

const boardAPI = {
  create: () => {
    const url = "board/create";
    return axiosClient.post(url);
  },
  getAll: () => {
    const url = "board";
    return axiosClient.get(url);
  },
  updatePosition: (data) => {
    // data = {boards: [...]}
    const url = "board";
    return axiosClient.put(url, data);
  },
  getFavorite: () => {
    const url = "board/favorites";
    return axiosClient.get(url);
  },
  updateFavoritePosition: (data) => {
    // data = {boards: [...]}
    const url = "board";
    return axiosClient.put(url, data);
  },
  getById: (boardId) => {
    const url = `board/${boardId}`;
    return axiosClient.get(url);
  },
  updateBoard: (boardId, data) => {
    // data = {title: x, description: x, isFavorite: x}
    const url = `board/${boardId}`;
    return axiosClient.put(url, data);
  },
  delete: (boardId) => {
    const url = `board/${boardId}`;
    return axiosClient.delete(url);
  },
};

export default boardAPI;
