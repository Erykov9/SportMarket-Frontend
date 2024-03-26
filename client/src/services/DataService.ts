import axios, { AxiosResponse } from 'axios';
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

  async getOne<T>(endpoint: string, id?: string): Promise<T> {
    try {
      const response = await axios.get(`${this._baseURL}/${endpoint}/${id}`, {withCredentials: true});
      return response.data;
    } catch (error){
      throw new Error(`Couldn't get ${endpoint} list. ${error}`);
    }
  }

  async update<T>(endpoint: string, id: string, body: T) {
    try {
      const response = await axios.put(`${this._baseURL}/${endpoint}/${id}`, body, {withCredentials: true});
      return response.data;
    } catch (error) {
      throw new Error(`Couldn't update ${endpoint}. ${error}`)
    }
  }

  async create<T>(endpoint: string, body: T) {
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

  async register(endpoint: string, body: RegisterForm): Promise<AxiosResponse> {
    try {
      const bodyToRegister = {
        ...body,
        roles: ["User"]
      };

      const response = await axios.post(`${this._baseURL}/auth/${endpoint}`, bodyToRegister);
      console.log(response)

      if(response.status === 400) {
        return response;
      }
      return response.data;
    } catch (error) {
      throw new Error("Incorrect login or password")
    }
  }

  async login(endpoint: string, body: LoginForm): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${this._baseURL}/auth/${endpoint}`, body, {withCredentials: true});
      return response;
    } catch (error) {
      throw new Error("Login failed. " + error);
    }
  }

  async isLogged(endpoint: string): Promise<void | AxiosResponse> {
    try {
      const response: AxiosResponse = await axios.get(`${this._baseURL}/auth/${endpoint}`, {withCredentials: true});
      return response;
    } catch (error) {
      throw new Error("Server Error");
    }
  }

  async logout(endpoint: string): Promise<void> {
    try {
      await axios.post(`${this._baseURL}/auth/${endpoint}`, {}, {withCredentials: true});
    } catch (error) {
      throw new Error("Server Error");
    }
  }
};

export default new DataService();