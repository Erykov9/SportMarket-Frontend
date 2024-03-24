import { action, makeAutoObservable } from "mobx";
import DataService from "../services/DataService";

class SingleProductStore {
  public product: Product | null = null;
  public isError: boolean = false;

  constructor()  {
    makeAutoObservable(this);
  };

  @action
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

  async update(id: string, body: any) {
    await DataService.update("products", id, body);
  }

  async create(body: any) {
    await DataService.create("products", body);
  }

  async delete(id: string) {
    await DataService.delete("products", id);
  }


};

export default new SingleProductStore();