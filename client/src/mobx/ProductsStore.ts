import { makeAutoObservable, toJS } from "mobx";
import DataService from "../services/DataService";

export interface IProductQuery {
  filterOn: string | null;
  filterQuery: string | null;
  sortBy: string | null;
  filterCategory: string | null;
  isAscending: boolean;
  pageNumber: number;
  pageSize: number;
}

class ProductsStore {
  public products: Product[] = [];
  public initialQueryState: IProductQuery = {
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    filterCategory: "",
    isAscending: true,
    pageNumber: 1,
    pageSize: 10,
  };

  public pagination: Pagination = {
    totalCount: 0,
    totalPages: 0,
    pageSize: 0,
    pageNumber: 0,
  };

  public query: IProductQuery = this.initialQueryState;
  public isError: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.refetch();
    this.setQuery(this.query);
    this.queryBuilder(this.query);
  };

  setQuery(query: IProductQuery) {
    this.query = query;
    this.refetch(this.queryBuilder(this.query));
  };

  queryBuilder = (query: IProductQuery): string => {
    const queryString: string = `?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&filterCategory=${query.filterCategory}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
    return queryString;
  };

  setProducts(products: Product[]) {
    this.products = products;
  };

  setPagination(pagination: Pagination) {
    this.pagination = pagination;
  };

  async refetch(query?: string) {
    try {
      this.isError = false;
      const data = await DataService.getAll("products", query);
      this.setProducts(data?.products);
      this.setPagination({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        totalPages: data.totalPages
      });
    } catch (error) {
      this.isError = true;
    }
  };
}

export default new ProductsStore();