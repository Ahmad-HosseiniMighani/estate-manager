import axios from "axios";
//import logger from "./logService";
import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status > 400 &&
    error.response.status !== 404 &&
    error.response.status < 500;
  //console.log("FIND ERROR:", error.response);
  if (!expectedError) {
    // logger.log(error);
    //toast.error("متاسفانه مشکلی از سمت سرور رخ داده است.");
  }

  return Promise.reject(error);
});
function setJwt(Jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Jwt}`;
}
function createInstance() {
  return axios.create();
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  CancelToken: axios.CancelToken,
  setJwt,
  createInstance,
  toast,
};
