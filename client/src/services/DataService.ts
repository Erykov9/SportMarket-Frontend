import axios from 'axios';
import { RegisterForm } from '../pages/Auth/Register/Register';
import { LoginForm } from '../pages/Auth/Login/Login';

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
      const response = await axios.get(`${this._baseURL}/${endpoint}/${id}`, {withCredentials: true});
      return response.data;
    } catch (error){
      throw new Error(`Couldn't get ${endpoint} list. ${error}`);
    }
  }

  async update(endpoint: string, id: string, body: any) {
    try {
      const response = await axios.put(`${this._baseURL}/${endpoint}/${id}`, body, {withCredentials: true});
      return response.data;
    } catch (error) {
      throw new Error(`Couldn't update ${endpoint}. ${error}`)
    }
  }

  async create(endpoint: string, body: any) {
    try {
      const response = await axios.post(`${this._baseURL}/${endpoint}`, body, {withCredentials: true});
      return response;
    } catch(error) {
      throw new Error(`Couldn't create new ${endpoint}. ${error}`)
    }
  }

  async delete(endpoint: string, id: string) {
    try {
      await axios.delete(`${this._baseURL}/${endpoint}/${id}`, {withCredentials: true})
    } catch(error) {
      throw new Error(`Couldn't delete ${endpoint}. ${error}`)
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

  async login(endpoint: string, body: LoginForm) {
    try {
      const response = await axios.post(`${this._baseURL}/auth/${endpoint}`, body, {withCredentials: true});
      return response;
    } catch (error) {
      throw new Error("Login failed. " + error);
    }
  }

  async isLogged(endpoint: string) {
    try {
      const response = await axios.get(`${this._baseURL}/auth/${endpoint}`, {withCredentials: true});
      return response;
    } catch (error) {
      throw new Error("Server Error");
    }
  }

  async logout(endpoint: string) {
    try {
      await axios.post(`${this._baseURL}/auth/${endpoint}`, {}, {withCredentials: true});
    } catch (error) {
      throw new Error("Server Error");
    }
  }
};

export default new DataService();