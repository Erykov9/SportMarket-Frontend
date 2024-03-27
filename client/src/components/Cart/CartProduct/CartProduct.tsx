import React from 'react'
import styles from "../Cart.module.scss";
import { Button, Divider, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CartStore from '../../../mobx/CartStore';

interface CartProductProps {
  product: Partial<Product>;
}

const CartProduct: React.FC<CartProductProps> = ({product}) => {
  const deleteHandler = (): void => {
    CartStore.deleteFromCart(product.id as string);
  };

  return (
    <>
      <div className={styles.cartProduct}>
        <Stack gap={1} sx={{width: 200}}>
          <p><a href={`/${product.id}`}>{product.productName}</a></p>
          <p>{product.productPrice} $</p>
        </Stack>
        <Stack>
          <Button color="error" onClick={deleteHandler}><DeleteForeverIcon/></Button>
        </Stack>
      </div>
      <Divider/>
    </>
  )
};

export default CartProduct