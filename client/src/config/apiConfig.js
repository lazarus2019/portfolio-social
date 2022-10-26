const token = "";

const apiConfig = {
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export default apiConfig;
