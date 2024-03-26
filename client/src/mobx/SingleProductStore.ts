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
      const data: Product = await DataService.getOne("products", id);
      this.setProduct(data);
    } catch (error) {
      this.isError = true;
    }
  };

  async update(id: string, body: Partial<Product>) {
    const response = await DataService.update("products", id, body);
    return response;
  }

  async create(body: Partial<Product>) {
    const response = await DataService.create("products", body);
    return response;
  }

  async uploadImage(body: Partial<FormData>) {
    const response = await DataService.create("images/upload", body);
    return response;
  }

  async deleteImage(id: string) {
    const response = await DataService.delete("images/delete", id);
    return response;
  }

  async delete(id: string) {
    await DataService.delete("products", id);
  }
};

export default new SingleProductStore();