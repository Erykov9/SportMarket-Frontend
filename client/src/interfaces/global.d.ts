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
  images: Image[]
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface Category {
  id: string;
  categoryName: string;
}

interface Pagination {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number
}

interface Image {
  id: string;
  file: null;
  fileName: string;
  fileDescription: string;
  fileExtension: string;
  fileSizeInBytes: number;
  filePath: string;
  fileUsername: string;
  productId: string;
}

interface IError {
  error: string;
}

interface Purchase {
  id: string;
  products: string;
  isPaid: boolean;
  totalPrice: number;
  city: string;
  street: string;
  country: string;
  streetNumber: string;
  userId: string;
  user: User
}