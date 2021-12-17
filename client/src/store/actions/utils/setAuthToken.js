import axios from "axios";
const setAuthToken = (token, role) => {
  if (token) {
    axios.defaults.headers.common["AUTHORIZATION"] = `Bearer ${token}`;
    axios.defaults.headers.common["ROLE"] = role;
  } else {
    delete axios.defaults.headers.common["AUTHORIZATION"];
    delete axios.defaults.headers.common["ROLE"];
  }
};
export default setAuthToken;
