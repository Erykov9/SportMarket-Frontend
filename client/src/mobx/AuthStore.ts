import { makeAutoObservable } from "mobx";
import DataService from "../services/DataService";
import { LoginForm } from "../pages/Auth/Login/Login";

class AuthStore {
  public isUserLogged: boolean = false;

  constructor() {
    makeAutoObservable(this);
  };

  async login(body: LoginForm) {
    try {
      await DataService.login("login", body);
      sessionStorage.setItem("user", body.username);
      this.isUserLogged = true;
    } catch (error) {
      return {error: "Username or password are incorrect."}
    }
  };

  async logout() {
    await DataService.logout("logout");
    this.isUserLogged = false;
  }

  async isLogged() {
    try {
      const response = await DataService.isLogged("isLogged");
      this.isUserLogged = true;
      return response;
    } catch(error) {
      return false;
    }
  };
  
};

export default new AuthStore();