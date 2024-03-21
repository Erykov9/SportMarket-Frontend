import { makeAutoObservable } from "mobx";
import DataService from "../services/DataService";

class SingleProductStore {
  public product: Product | null = null;
  public isError: boolean = false;

  constructor()  {
    makeAutoObservable(this);
  };

  setProduct(product: Product): void {
    this.product = product;
  };

  async fetch(id?: string): Promise<void> {
    try {
      this.isError = false;
      const data = await DataService.getOne("products", id);
      this.setProduct(data);
    } catch (error) {
      this.isError = true;
    }
  };
};

export default new SingleProductStore();