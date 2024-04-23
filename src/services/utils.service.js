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
}

const utilsService = new UtilsService(backendURL);
export default utilsService;
