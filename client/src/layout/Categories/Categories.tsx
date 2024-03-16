import CategoriesStore from "../../mobx/CategoriesStore";
import ProductsStore from "../../mobx/ProductsStore";
import styles from "./Categories.module.scss";
import { Container, Tooltip } from "@mui/material";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { observer } from "mobx-react";


const Categories = observer(() => {
  const imageUrlBuilder = (categoryName: string): string => {
    const categoryString = categoryName.replace(/\s/g, '').toLowerCase();
    const result = `/assets/${categoryString}.jpg`;
    return result;
  };

  const categories = CategoriesStore.categories;

  return (
    <Container>
      <div className={styles.categories}>
        <h1 onClick={() => ProductsStore.setQuery(ProductsStore.initialQueryState)}>Categories</h1>
        {CategoriesStore.categories.length === 0 ? (
          <LoadingComponent />
        ) : (
          <div className={styles.categoriesWrapper}>
            {categories?.map((category: Category) => (
              <Tooltip key={category.categoryName} title={category.categoryName} onClick={() => (
                ProductsStore.setQuery({...ProductsStore.query, filterCategory: category.categoryName})
                
                )}>
              <div className={styles.paper}
                style={{ backgroundImage: `url(${imageUrlBuilder(category.categoryName)})`, filter: ProductsStore.query.filterCategory === category.categoryName ? 'grayscale(0)' : '' }}
              >
                <p>{category?.categoryName}</p>
              </div>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
});

export default Categories;
