interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  user: User;
  category: Category;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface Category {
  categoryName: string;
}