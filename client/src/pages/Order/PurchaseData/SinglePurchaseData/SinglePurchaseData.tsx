import { Button } from "@mui/material";
import React, { useState } from "react";
import { themeStyles } from '../../../../utils/themeStyles';
import PurchaseStore, { IProductPurchase } from "../../../../mobx/PurchaseStore";
import { observer } from "mobx-react";

interface ISingleProductPurchaseDataProps {
  product: IProductPurchase
}

const SinglePurchaseData: React.FC<ISingleProductPurchaseDataProps> = observer(({product}) => {
  const [amount, setAmount] = useState<number>(product.amount);
  const basePrice = product.productPrice;

  const up = () => {
    if (amount < 99) {
      setAmount(amount + 1);
      PurchaseStore.setAmount(product.id, amount + 1, basePrice);
    }
  };

  const down = () => {
    if (!(amount < 2)) {
      setAmount(amount - 1);
      PurchaseStore.setAmount(product.id, amount - 1, basePrice);
    }
  };

  return (
    <>
      <p style={{ margin: "2px 0" }}>
        Product:{" "}
        <span style={{ color: themeStyles.secondary }}>
          {product?.productName}
        </span>
      </p>
      <p style={{ margin: "2px 0" }}>
        Price:{" "}
        <span style={{ color: themeStyles.secondary }}>
          {(product?.newPrice as number)}$
        </span>
      </p>
      <p>
        Amount:<Button onClick={down}>-</Button>
        {amount}
        <Button onClick={up}>+</Button>
      </p>
    </>
  );
});

export default SinglePurchaseData;
