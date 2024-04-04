import React, { useState, useEffect, useRef } from "react";
import styles from "./Cart.module.scss";
import { createPortal } from "react-dom";
import CartProduct from "./CartProduct/CartProduct";
import { Button } from "@mui/material";
import PurchaseStore from "../../mobx/PurchaseStore";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { v4 as uuidv4 } from 'uuid'

interface ICartProps {
  isOpen: boolean;
  cartProducts?: Partial<Product[]>;
  handleClose: () => void;
}

const Cart: React.FC<ICartProps> = ({ isOpen, cartProducts, handleClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("");
  const [price, setPrice] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const getOutterModalClick = (e: MouseEvent) => {
    if(isOpen) {
      if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    }
  };

  const buyHandler = () => {
    const guid = uuidv4();
    PurchaseStore.setProduct(cartProducts as Product[]);
    navigate(`/order/${guid}/buynow`);
    
  };
  
  useEffect(() => {
    document.addEventListener('click', getOutterModalClick);

    return () => {
      document.removeEventListener('click', getOutterModalClick);
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationClass(styles.cartOpen);
    } else if (!isOpen && shouldRender) {
      setAnimationClass(styles.cartClose);
      setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (cartProducts) {
      const total = cartProducts.reduce((acc, curr) => {
        return acc + curr!.productPrice;
      }, 0);

      setPrice(total);
    }
  }, [cartProducts, isOpen]);

  return (
    <>
      {shouldRender &&
        createPortal(
          <div id="cart" className={`${styles.cart} ${animationClass}`} ref={modalRef}>
            <div className={styles.cartWrapper}>
              <div className={styles.header}>
                <h2>Your cart</h2>
              </div>
              <div className={styles.cartProducts}>
                {cartProducts?.length !== 0 ? (
                  cartProducts?.map((product) => (
                    <CartProduct
                      product={product as Product}
                      key={product?.id}
                    />
                  ))
                ) : (
                  <h3 style={{ textAlign: "center", fontWeight: 300 }}>
                    Your cart is empty
                  </h3>
                )}
              </div>
              {cartProducts?.length !== 0 && (
                <div className={styles.result}>
                  <div><span>Result: </span>
                  <span>{price}</span>$</div>
                  
                  <Button variant="contained" color="secondary" onClick={buyHandler}>
                    Buy
                  </Button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Cart;
