import { Divider } from "@mui/material";
import styles from "./Product.module.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface IProductProps {
  product: Product;
}

const Product: React.FC<IProductProps> = ({product}) => {
  const navigate = useNavigate();
  const src = product.images.length !== 0 ? product.images[0].filePath : "assets/imageplaceholder.png";
  const alt = product.images.length !== 0 ? product.images[0].fileName : "placeholder";

  const trimDescription = (description: string) => {
    const dsc = description.slice(0, 250).split("");
    if(dsc[dsc.length - 1] === " ") {
      dsc.pop();
    }
    return description.length < 250 ? description : dsc.join("") + "...";
  };

  return (
    <div className={styles.product} onClick={() => navigate(`${product.id}`)}> 
      <div className={styles.image}>
        <img src={src} alt={alt}></img>
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.productHeader}>
            <h3>{product.productName}</h3>
            <p>{trimDescription(product.productDescription)}</p>
            <p className={styles.productInfo}>Category: <span>{product.category.categoryName}</span></p>
            <p className={styles.productInfo}>Location: <span>{product.location}</span></p>
            <p className={styles.productInfo}>Added: <span>{moment(product.createdAt).format("YYYY/MM/DD")}</span></p>
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