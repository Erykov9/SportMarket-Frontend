import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { useState } from "react";
import PurchaseData from "./PurchaseData/PurchaseData";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import { observer } from "mobx-react";
import PurchaseStore from "../../mobx/PurchaseStore";
import FinishOrder from "./FinishOrder/FinishOrder";
import { useNavigate } from "react-router-dom";

const steps = ["Checkout", "Delivery details", "Finish"];

const Order = observer(() => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { deliveryAddress, products } = PurchaseStore;
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    const totalPrice = products.reduce((acc, curr) => {
      return acc + curr!.newPrice;
    }, 0);

    const purchaseProductsData: ProductToSend[] = products.map(product => {
      const data: ProductToSend = {
        productId: product.id,
        productName: product.productName,
        price: product.newPrice,
        amount: product.amount
      };

      return data;
    });

    const purchaseData = {
      ...deliveryAddress,
      totalPrice,
      products: purchaseProductsData
    };

    PurchaseStore.purchase(purchaseData as PurchaseToSend);
    navigate("/");
  };

  return (
    <Container>
      <div>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext} disabled={activeStep === 1 && !deliveryAddress?.isSubmitted}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
        {activeStep === 0 && (
          <>
            <Divider>Details</Divider>
            <PurchaseData />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Divider>Your delivery address</Divider>
            <DeliveryForm />
          </>
        )}
        {activeStep === 2 && (
          <>
            <FinishOrder/>
          </>
        )

        }
      </div>
    </Container>
  );
});

export default Order;
