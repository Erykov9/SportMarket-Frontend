import { useFormik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import * as Yup from "yup";
import styles from "./DeliveryForm.module.scss";
import PurchaseStore from "../../../mobx/PurchaseStore";

const DeliveryForm = () => {
  const validationSchema = Yup.object().shape({
    city: Yup.string().min(3, "City must be at least 3 letters long").max(25, "City can't be longer than 25 letters").required("City is required"),
    street: Yup.string().min(3, "Street must be at least 3 letters long").max(25, "Street can't be longer than 25 letters").required("Street is required"),
    country: Yup.string().min(3, "Country must be at least 3 letters long").max(25, "Country can't be longer than 25 letters").required("Country is required"),
    streetNumber: Yup.string().min(1).max(5, "Local number can't be longer than 5 letters"),
  });

  const { deliveryAddress } = PurchaseStore;

  const formik = useFormik({
    initialValues: {
      city: deliveryAddress?.city || "",
      street: deliveryAddress?.street || "",
      country: deliveryAddress?.country || "",
      streetNumber: deliveryAddress?.streetNumber || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const address = {
        ...values,
        isSubmitted: true,
      };

      PurchaseStore.setAddress(address);
    },
  });

  return (
    <div className={styles.deliveryForm}>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction={"column"}
          gap={2}
          justifyContent={"center"}
          paddingBottom={2}
        >
          <TextField
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            id="street"
            name="street"
            label="Street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
          <TextField
            id="streetNumber"
            name="streetNumber"
            label="Local number"
            value={formik.values.streetNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.streetNumber && Boolean(formik.errors.streetNumber)
            }
            helperText={
              formik.touched.streetNumber && formik.errors.streetNumber
            }
          />
          <TextField
            id="country"
            name="country"
            label="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </Stack>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DeliveryForm;
