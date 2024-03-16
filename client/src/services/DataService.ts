import axios from 'axios';

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
};

export default new DataService();