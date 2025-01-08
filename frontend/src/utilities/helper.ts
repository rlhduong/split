import axios from 'axios';

axios.defaults.withCredentials = true;
const BASE_URL = import.meta.env.VITE_BASE_URL;

class RequestHelper {
  public async get(url: string) {
    try {
      const res = await axios.get(BASE_URL + url);
      return res;
    } catch (error: any) {
      return error.response;
    }
  }

  public async post(url: string, body: any = {}) {
    try {
      const res = await axios.post(BASE_URL + url, body);
      return res;
    } catch (error: any) {
      return error.response;
    }
  }

  public async put(url: string, body: any) {
    const data = await axios.put(BASE_URL + url, body);
    return data;
  }

  public async delete(url: string) {
    const data = await axios.delete(BASE_URL + url);
    return data;
  }
}

export const request = new RequestHelper();