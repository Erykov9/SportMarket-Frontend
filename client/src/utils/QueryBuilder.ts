import { IProductQuery } from "../mobx/ProductsStore"

interface IQueryBuilder {
  query: IProductQuery
}

export const QueryBuilder = ({query}: IQueryBuilder) => {
  console.log(query)
  const queryString: string = `?filterOn=${query.filterOn}&filterQuery=${query.filterQuery}&sortBy=${query.sortBy}&filterCategory=${query.filterCategory}&isAscending=${query.isAscending}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`
  return queryString;
};