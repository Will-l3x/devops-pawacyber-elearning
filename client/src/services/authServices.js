import axios from "axios";
const qs = require('qs');
// const querystring = require('querystring');

const apiUrl = "https://cybers.azurewebsites.net/api";
// const apiUrl = "http://localhost:3001/api";

export const AuthService = {
  register,
  login
};

//Register New User
async function register(data) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    let res = await axios.post(`${apiUrl}/register`,qs.stringify(data),config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}


//Register New User
async function login(data) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  try {
    let res = await axios.post(`${apiUrl}/login`,qs.stringify(data),config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}