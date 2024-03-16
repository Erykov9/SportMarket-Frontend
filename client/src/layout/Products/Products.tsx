import { Container } from "@mui/material";
import styles from "./Products.module.scss";
import ProductsStore from "../../mobx/ProductsStore";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import Product from "./Product/Product";
import { observer } from "mobx-react";
import Advertisement from "../../components/Advertisement/Advertisement";

const Products = observer(() => {
  const { products, isError, query } = ProductsStore;

  if(isError) {
    return <LoadingComponent />;
  }

  return (
    <Container>
      <div className={styles.products}>
        <h2 className={styles.productsCategory}>{query.filterCategory}</h2>
        {products?.length !== 0 ? products?.map((product: Product, index: number) => (
          <>
            {(index + 1) % 4 === 0 && <Advertisement/>}
            <Product product={product} />
          </>
        )) : <h2>No results for key <span>"{query.filterQuery}"</span>.</h2>}
      </div>
    </Container>
  );
});

export default Products;
