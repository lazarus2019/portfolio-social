const getErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  return error.response.data;
};

export default getErrorMessage;
