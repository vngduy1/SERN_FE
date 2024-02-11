// import axios from "axios";
import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUser = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (id) => {
  return axios.delete(`/api/delete-user`, { data: { id: id } });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

export {
  handleLogin,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
};
