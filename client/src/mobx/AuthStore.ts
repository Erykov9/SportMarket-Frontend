import { action, makeAutoObservable } from "mobx";
import DataService from "../services/DataService";
import { LoginForm } from "../pages/Auth/Login/Login";
import { AxiosResponse } from "axios";

interface IUserData {
  id: string;
  username: string;
  email: string;
  products: Product[]
}


class AuthStore {
  public isUserLogged: boolean = false;
  private userDataInitialState: IUserData = {
    id: "",
    username: "",
    email: "",
    products: []
  };
  public username: string | null = null;
  public userData: IUserData = this.userDataInitialState;

  constructor() {
    makeAutoObservable(this);
    this.isLogged();
  };

  @action
  updateUserData(data: IUserData) {
    this.userData = data;
  };

  @action
  updateIsUserLogged(bool: boolean) {
    this.isUserLogged = bool;
  };

  async login(body: LoginForm): Promise<void | IError> {
    try {
      await DataService.login("login", body);
      this.updateIsUserLogged(true);
      this.getUserByUsername(body.username);
      this.username = body.username;
    } catch (error) {
      return {error: "Username or password are incorrect."};
    }
  };

  async logout(): Promise<void> {
    await DataService.logout("logout");
    this.updateIsUserLogged(false);
    this.username = null;
    this.userData = this.userDataInitialState;
  };

  async isLogged(): Promise<boolean> {
    try {
      const response: AxiosResponse | void = await DataService.isLogged("isLogged");
      if(response) {
        this.username = response.data.username;
        await this.getUserByUsername(response.data.username);
        this.updateIsUserLogged(true);
        return response.data.data;
      }

      this.isUserLogged = false;
      return false;
    } catch(error) {
      this.isUserLogged = false;
      return false;
    }
  };

  async getUserByUsername(username: string): Promise<void> {
    const response: IUserData = await DataService.getOne("profile", username);
    this.updateUserData(response);
  };
  
};

export default new AuthStore();