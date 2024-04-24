// system imports
import axios from "axios";

// custom imports
import { backendURL } from "../conf/conf";
import { utilsService } from "../services";

export class AuthService {
  serviceEndpoint;

  constructor() {
    this.serviceEndpoint = backendURL;
  }

  // function to register the user
  async createAccount({
    fullName,
    email,
    username,
    password,
    rePassword,
    avatar,
  }) {
    try {
      if (password === rePassword) {
        // creating the form data with necessary fields
        const data = new FormData();
        data.append("fullName", fullName);
        data.append("email", email);
        data.append("username", username);
        data.append("password", password);
        data.append("avatar", avatar);
        data.append("userRole", "STUDENT");

        // subscribe to newsletter
        await utilsService.subscribeToNewsLetter({ email });

        // registering
        const response = await axios.post(`${backendURL}/users/register`, data);
        // successfully registered
        return response;
      } else {
        // Checking if passwords match
        return 400;
      }
    } catch (error) {
      if (error.response.status === 409) {
        // user already exists
        return 409;
      } else if (error.response.status === 500) {
        // some error in the backend server
        return 500;
      } else {
        // some unknown error occured
        console.log(error);
        return null;
      }
    }
  }

  async login({ username, password }) {
    try {
      const response = await axios.post(`${this.serviceEndpoint}/users/login`, {
        username,
        password,
      });
      // login success
      return response.data.data.user;
    } catch (error) {
      if (error.response.status && error.response.status === 404) {
        // user doesn't exists
        return 404;
      } else if (error.response.status && error.response.status === 401) {
        // wrong credentials
        return 401;
      } else if (error.response.status && error.response.status === 500) {
        // backend server error
        return 500;
      } else {
        // something went wrong
        return null;
      }
    }
  }

  // async getCurrentUser() {}

  // function to logout an user
  async logout() {
    try {
      const response = await axios.post(`${this.serviceEndpoint}/users/logout`);
      // logout successful
      return response;
    } catch (error) {
      if (error.response.status && error.response.status === 401) {
        // already logged out
        return 401;
      } else if (error.response.status && error.response.status === 500) {
        // backend server error
        return 500;
      } else {
        // something went wrong
        return null;
      }
    }
  }
}

const authService = new AuthService();
export default authService;
