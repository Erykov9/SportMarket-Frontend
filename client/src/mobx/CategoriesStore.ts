import { makeAutoObservable } from "mobx";
import DataService from "../services/DataService";

class CategoriesStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetch();
  }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  async fetch(): Promise<void> {
    const data = await DataService.getAll("categories");
    this.setCategories(data);
  }
}

export default new CategoriesStore();