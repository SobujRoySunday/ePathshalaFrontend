// system imports
import axios from "axios";

// custom imports
import { backendURL } from "../conf/conf";

export class UtilsService {
  serverEndpoint;
  constructor(serverEndpoint) {
    this.serverEndpoint = serverEndpoint;
  }

  // function to check health of the backend server
  async healthCheck() {
    try {
      await axios.get(`${this.serverEndpoint}/health-check`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // function to subscribe an user to our news letter
  async subscribeToNewsLetter({ email }) {
    try {
      const response = await axios.post(`${this.serverEndpoint}/news-letter`, {
        email,
      });
      // successfully subscribed
      return response;
    } catch (error) {
      if (error.response.status && error.response.status === 409) {
        // already subscirbed
        return 409;
      } else if (error.response.status && error.response.status === 500) {
        // some issue in backend server
        return 500;
      } else {
        // some other issues occured
        console.log(error);
        return null;
      }
    }
  }
}

const utilsService = new UtilsService(backendURL);
export default utilsService;
