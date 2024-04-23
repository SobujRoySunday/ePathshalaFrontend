import axios from "axios";
import { backendURL } from "../conf/conf";

export class UtilsService {
  serverEndpoint;
  constructor(serverEndpoint) {
    this.serverEndpoint = serverEndpoint;
  }

  async healthCheck() {
    try {
      await axios.get(`${this.serverEndpoint}/health-check`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async subscribeToNewsLetter({ email }) {
    try {
      const response = await axios.post(`${this.serverEndpoint}/news-letter`, {
        email,
      });
      return response;
    } catch (error) {
      if (error.response.status && error.response.status === 409) {
        return 409;
      } else if (error.response.status && error.response.status === 500) {
        return 500;
      } else {
        console.log(error);
        return null;
      }
    }
  }
}

const utilsService = new UtilsService(backendURL);
export default utilsService;
