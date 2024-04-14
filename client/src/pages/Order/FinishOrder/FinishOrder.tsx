import PurchaseStore from "../../../mobx/PurchaseStore";
import { Divider, Stack } from "@mui/material";
import styles from "./FinishOrder.module.scss";

const FinishOrder = () => {
  const { products, deliveryAddress } = PurchaseStore;

  const totalProductsCost = products.reduce((acc, curr) => {
    return acc + curr!.newPrice;
  }, 0);

  const deliveryCost = 25;
  const totalPrice = totalProductsCost + deliveryCost;

  return (
    <div className={styles.finishOrder}>
      <Divider>
        Products summary
      </Divider>
      <Stack>
        {products.map((product, index: number) => (
          <>
            <div className={styles.productsInfo}>
              <p>
                Product:{" "}
                <span className={styles.info}>{product.productName}</span>
              </p>
              <p>
                Amount: <span className={styles.info}>{product.amount} pcs</span>
              </p>
              <p>
                Price: <span className={styles.info}>{product.newPrice}$</span>
              </p>
            </div>
            {!(products.length - 1 === index) && <Divider />}
          </>
        ))}
      </Stack>
      <Divider>Address summary</Divider>
      <Stack>
        <div className={styles.addressInfo}>
          <p>
            Country:{" "}
            <span className={styles.info}>{deliveryAddress?.country}</span>
          </p>
          <p>
            City: <span className={styles.info}>{deliveryAddress?.city}</span>
          </p>
          <p>
            Address:{" "}
            <span className={styles.info}>
              {deliveryAddress?.street}
              {`${
                deliveryAddress?.streetNumber &&
                `/${deliveryAddress.streetNumber}`
              }`}
            </span>
          </p>
        </div>
      </Stack>
      <Divider>Summary</Divider>
      <Stack>
        <div className={styles.summary}>
        <p>Products summary cost: <span className={styles.info}>{totalProductsCost}$</span></p>
        <p>Delivery cost: <span className={styles.info}>{deliveryCost}</span></p>
        <p>Total cost: <span className={styles.info}>{totalPrice}$</span></p>
        </div>

      </Stack>
    </div>
  );
};

export default FinishOrder;
