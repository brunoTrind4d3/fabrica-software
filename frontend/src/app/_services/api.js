import axios from "axios";
import { environment } from "../../environments/environment";

const api = axios.create({
  baseURL: `${environment.api}`,
});

if (localStorage.getItem("currentUser")) {
  const { token } = JSON.parse(localStorage.getItem("currentUser"));
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
