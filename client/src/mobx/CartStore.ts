import { action, makeAutoObservable } from "mobx";

class CartStore {
  public cartProducts: Partial<Product[]> = [];

  constructor() {
    makeAutoObservable(this);
    this.getCart();
  }

  @action
  updateCart(data: Partial<Product>): Partial<Product[]> {
    this.cartProducts.push(data as Product);
    return this.cartProducts;
  }

  @action
  getCart() {
    const cart = localStorage.getItem("cart");
    if (cart !== null) {
      this.cartProducts = JSON.parse(cart);
      return;
    }

    return;
  }

  addToCart(data: Partial<Product>) {
    const isDuplicated = this.cartProducts.find(
      (product) => product?.id === data.id
    );
    if (isDuplicated) {
      return;
    }

    const cartProducts = this.updateCart(data);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }

  deleteFromCart(id: string) {
    const filteredCartProducts = this.cartProducts.filter(
      (product) => product?.id !== id
    );
    this.cartProducts = filteredCartProducts;
    localStorage.setItem("cart", JSON.stringify(filteredCartProducts));
  }
}

export default new CartStore();
