import axios from "axios";
const qs = require("qs");
const apiUrl = "https://cybers.azurewebsites.net/api";
const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

const config = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
    "Access-Control-Allow-Credentials": true,
  },
};
export const AuthService = {
  register,
  login,
  profile,
};

//Register New User
async function register(data) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.post(
      `${apiUrl}/register`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

//Register New User
async function login(data) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    let res = await axios.post(`${apiUrl}/login`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function profile() {
  try {
    let res = await axios.get("/profile", config);
    return res;
  } catch (err) {
    console.error(err);
  }
}
