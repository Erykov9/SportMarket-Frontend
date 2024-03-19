interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  user: User;
  category: Category;
  location: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface Category {
  categoryName: string;
}

interface Pagination {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number
}