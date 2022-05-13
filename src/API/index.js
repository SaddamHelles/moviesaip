import axios from "axios";

const baseAPI = axios.create({ baseURL: "https://api.themoviedb.org/3" });

const CRUDRequests = {
  get: async (url) => {
    return baseAPI.get(url, {});
  },
  post: async (url) => {
    return baseAPI.post(url, {}, {});
  },
  delete: async (url) => {
    return baseAPI.delete(url, {}, {});
  },
  put: async (url) => {
    return baseAPI.put(url, {}, {});
  },
};

export default CRUDRequests;
