import { makeAutoObservable, toJS } from "mobx";

export interface IProductPurchase {
  id: string;
  productName: string;
  productPrice: number;
  amount: number;
  newPrice: number;
}

class PurchaseStore {
  public purchases: Purchase[] = [];
  public products: IProductPurchase[] = [];

  constructor() {
    makeAutoObservable(this);
  };

  setProduct(product: Product[]): void {
    this.products = [];
    const productsArray: IProductPurchase[] = [];

    for(let p of product) {
      const { category, images, user, productDescription, createdAt, updatedAt, location, ...rest } = p;
      const productData = {
        ...rest,
        newPrice: p.productPrice,
        amount: 1
      };

      productsArray.push(productData);
    }

    this.products = productsArray;
  }

  setAmount(id: string, newAmount: number, basePrice: number): void {
    const index = this.products.findIndex(product => product.id === id);
    this.products[index].amount = newAmount;
    this.products[index].newPrice = basePrice * newAmount;
  }
};

export default new PurchaseStore();

