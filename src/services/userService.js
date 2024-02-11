// import axios from "axios";
import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUser = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserService = (data) => {
  console.log("data", data);
  return axios.post("/api/create-new-user", data);
};

export { handleLogin, getAllUser, createNewUserService };
