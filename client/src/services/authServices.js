import axios from "axios";
const qs = require("qs");
const apiUrl = "https://cybers.azurewebsites.net/api";
export const AuthService = {
  register,
  login,
};

//Register New User
async function register(data) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
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
