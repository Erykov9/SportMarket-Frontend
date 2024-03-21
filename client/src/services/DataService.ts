import axios from 'axios';
import { RegisterForm } from '../pages/Auth/Register/Register';

class DataService {
  private readonly _baseURL = process.env.REACT_APP_BASE_URL;

  async getAll(endpoint: string, query?: string) {
    try {
      const response = await axios.get(`${this._baseURL}/${endpoint}${query ? query : ""}`);
      return response.data;
    } catch (error) {
      throw new Error(`Couldn't get ${endpoint} list. ${error}`);
    }
  }

  async getOne(endpoint: string, id?: string) {
    try {
      const response = await axios.get(`${this._baseURL}/${endpoint}/${id}`);
      return response.data;
    } catch (error){
      throw new Error(`Couldn't get ${endpoint} list. ${error}`);
    }
  }

  async register(endpoint: string, body: RegisterForm) {
    try {
      const bodyToRegister = {
        ...body,
        roles: ["User"]
      };

      const response = await axios.post(`${this._baseURL}/auth/${endpoint}`, bodyToRegister);
      return response.data;
    } catch (error) {
      return {error: "Register failed. " + error}
    }
  }
};

export default new DataService();