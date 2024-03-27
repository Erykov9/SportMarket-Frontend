import styles from "./SingleProduct.module.scss";
import { useParams } from "react-router-dom";
import SingleProductStore from "../../mobx/SingleProductStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Container, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import NotFound from "../NotFound/NotFound";
import AuthStore from "../../mobx/AuthStore";
import CartStore from "../../mobx/CartStore";


const SingleProduct = observer(() => {
  const { id } = useParams();
  const { product, isError } = SingleProductStore;
  const { isUserLogged } = AuthStore;
  const navigate = useNavigate();

  useEffect(() => {
    SingleProductStore.fetch(id);
  }, []);

  const cartHandler = () => {
    const cartProduct: Partial<Product> = {
      id: product?.id,
      productName: product?.productName,
      productPrice: product?.productPrice
    };

    CartStore.addToCart(cartProduct);
  };

  if(isError) {
    return <div><NotFound/></div>
  }

  if (!product) {
    return <div><LoadingComponent/></div>
  }

  const images = product?.images.length !== 0 ? product?.images.map(image => ({original: image.filePath, thumbnail: image.filePath})) : [{original: "assets/imageplaceholder.png"}];

  return (
    <Container>
      <Button sx={{marginBottom: '20px;'}} onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
      <div className={styles.singleProduct}>
        <div className={styles.wrapper}>
          <div className={styles.gallery}>
            <ImageGallery items={images} showPlayButton={false} showNav={false} />
          </div>
          <div className={styles.content}>
            <h4><span className={styles.username}>{product?.user.username.toUpperCase()}</span></h4>
            <h2><span>{product?.productName}</span></h2>
            <p className={styles.categoryName}>Category:<span> {product?.category.categoryName}</span></p>
            <p><span>{product?.productDescription}</span></p>
            <h3 className={styles.productPrice}>Price: <span>{product?.productPrice}$</span></h3>
            <Stack gap={2} display={'flex'} flexDirection={'row'}>
              <Button variant="contained" onClick={cartHandler} disabled={!isUserLogged}>Add to cart</Button>
              <Button variant="contained" color="success">Buy now</Button>
            </Stack>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default SingleProduct;
