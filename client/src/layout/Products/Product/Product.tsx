import { Divider } from "@mui/material";
import styles from "./Product.module.scss";

interface IProductProps {
  product: Product;
}

const Product: React.FC<IProductProps> = ({product}) => {
  return (
    <div className={styles.product}>
      <div className={styles.image}>
        <img src="assets/imageplaceholder.png" alt="placeholder"></img>
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.productHeader}>
            <h3>{product.productName}</h3>
            <p>{product.productDescription}</p>
            <p>Category: <span>{product.category.categoryName}</span></p>
          </div>
          <Divider/>
          <div className={styles.productFooter}>
            <span>{product.user.username}</span>
          </div>
        </div>
        <div className={styles.price}>
          <h4><span>{product.productPrice}$</span></h4>
        </div>
      </div>
    </div>
  )
};

export default Product;