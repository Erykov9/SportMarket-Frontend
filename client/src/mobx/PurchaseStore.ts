import { action, makeAutoObservable, toJS } from "mobx";
import CartStore from "./CartStore";
import DataService from "../services/DataService";

export interface IProductPurchase {
  id: string;
  productName: string;
  productPrice: number;
  amount: number;
  newPrice: number;
};

export interface IProductDeliveryAddress {
  city: string;
  street: string;
  country: string;
  streetNumber: string;
  isSubmitted: boolean;
};

class PurchaseStore {
  public purchases: Purchase[] = [];
  public products: IProductPurchase[] = [];
  public deliveryAddress: IProductDeliveryAddress | null = null;

  constructor() {
    makeAutoObservable(this);
  };

  @action
  setDonePurchase(): void {
    this.products = [];
    this.deliveryAddress = null;
    CartStore.removeAllCart();
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
  };

  setAmount(id: string, newAmount: number, basePrice: number): void {
    const index = this.products.findIndex(product => product.id === id);
    this.products[index].amount = newAmount;
    this.products[index].newPrice = basePrice * newAmount;
  };

  @action
  setAddress(address: IProductDeliveryAddress) {
    this.deliveryAddress = address;
  };

  async purchase(body: PurchaseToSend): Promise<void> {
    await DataService.purchase("purchases", body);
    this.setDonePurchase();
  };
};

export default new PurchaseStore();

