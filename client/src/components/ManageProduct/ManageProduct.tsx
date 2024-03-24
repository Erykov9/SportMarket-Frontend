import { toJS } from "mobx";
import SingleProductStore from "../../mobx/SingleProductStore";
import ProductsStore from "../../mobx/ProductsStore";
import CategoriesStore from "../../mobx/CategoriesStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
import styles from "./ManageProduct.module.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField, Button, MenuItem, Stack, Divider } from "@mui/material";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useState } from "react";
import ManageProductGallery from "./ManagrProductGallery/ManageProductGallery";

interface IManageProductProps {
  id?: string;
  isEdit: boolean;
  handleOpen: () => void;
  refetch: () => void;
}

interface ProductDTO {
  productName: string;
  productPrice: number;
  productDescription: string;
  location: string;
  category: Category;
}

const ManageProduct: React.FC<IManageProductProps> = observer(
  ({ id, isEdit, handleOpen, refetch }) => {
    const { product } = SingleProductStore;
    const { categories } = CategoriesStore;
    const [imagesUploaded, setImagesUploaded] = useState<ImageListType>([]);
    const maxNumber: number = 10;

    useEffect(() => {
      if (isEdit) {
        SingleProductStore.fetch(id);
      }
    }, []);

    const initialValues: ProductDTO = {
      productName: "",
      productDescription: "",
      productPrice: 1,
      location: "",
      category: categories[0],
    };

    const handleImages = (
      imageList: ImageListType,
    ): void => {
      setImagesUploaded(imageList as never[]);
    };

    const handleCreateProduct = async (data: ProductDTO) => {
      const { category, ...restData } = data;
      const dataToPost = {
        ...restData,
        categoryId: category.id,
        createdAt: new Date(),
      };

      const response = await SingleProductStore.create(dataToPost);

      if (imagesUploaded.length !== 0) {
        const productId: string = response.data.id;

        await Promise.all(
          imagesUploaded.map(async (image) => {
            const file = image.file;
            const data = new FormData();
            data.append("file", file as Blob);
            data.append("productId", productId);

            const response = await SingleProductStore.uploadImage(data);
            return response;
          })
        );
      }

      await ProductsStore.refetch();
      refetch();
      handleOpen();
    };

    const handleUpdateProduct = async (data: Product) => {
      const { category, images, user, id, ...restData } = data;

      const dataToPost = {
        ...restData,
        categoryId: category.id,
        updatedAt: new Date(),
      };

      const response = await SingleProductStore.update(id, dataToPost);

      if (imagesUploaded.length !== 0) {
        const productId: string = response.id;

        await Promise.all(
          imagesUploaded.map(async (image) => {
            const file = image.file;
            const data = new FormData();
            data.append("file", file as Blob);
            data.append("productId", productId);

            const response = await SingleProductStore.uploadImage(data);
            return response;
          })
        );
      }

      await ProductsStore.refetch();
      refetch();
      handleOpen();
    };

    const handleDeleteProduct = async (id?: string) => {

      if(product?.images.length !== 0 && product) {
        await Promise.all(
          product?.images.map(async (image) => {
            return await SingleProductStore.deleteImage(image.id);
          })
        );
      }
      await SingleProductStore.delete(id as string);
      await ProductsStore.refetch();
      refetch();
      handleOpen();
    };

    const validationSchema = Yup.object({
      productName: Yup.string()
        .required("Product name is required")
        .min(6, "Product name must be at least 6 characters")
        .max(36, "Product name must be 36 characters or less"),
      productDescription: Yup.string()
        .required("Product description is required")
        .min(20, "Product description must be at least 20 characters")
        .max(1000, "Product description must be 1000 characters or less"),
      location: Yup.string()
        .required("Location is required")
        .min(3, "Location must be at least 3 characters")
        .max(25, "Location must be 25 characters or less"),
      productPrice: Yup.number()
        .required("Product price is required")
        .min(1, "Product price must be at least 1")
        .max(100000, "Product price must be 100000 or less"),
    });

    if (!product && isEdit) {
      return <LoadingComponent />;
    }

    return (
      <div className={styles.manageProduct}>
        <Formik
          initialValues={
            isEdit ? (product as Product) : (initialValues as ProductDTO)
          }
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            if (isEdit) {
              handleUpdateProduct(values as Product);
            } else {
              handleCreateProduct(values as ProductDTO);
            }

            setSubmitting(false);
          }}
        >
          {({ handleBlur, isSubmitting, values, touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="productName"
                label="Product"
                value={values.productName}
                onBlur={handleBlur}
                error={touched.productName && Boolean(errors.productName)}
                helperText={touched.productName && errors.productName}
                fullWidth
                margin="normal"
              />
              <Field
                as={TextField}
                name="productDescription"
                label="Description"
                value={values.productDescription}
                onBlur={handleBlur}
                error={
                  touched.productDescription &&
                  Boolean(errors.productDescription)
                }
                helperText={
                  touched.productDescription && errors.productDescription
                }
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Field
                as={TextField}
                name="location"
                label="Location"
                value={values.location}
                onBlur={handleBlur}
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                fullWidth
                margin="normal"
              />
              <Field
                as={TextField}
                name="category.id"
                label="Category"
                value={values.category.id}
                onBlur={handleBlur}
                select
                fullWidth
                margin="normal"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                name="productPrice"
                label="Product Price"
                type="number"
                value={values.productPrice}
                onBlur={handleBlur}
                error={touched.productPrice && Boolean(errors.productPrice)}
                helperText={touched.productPrice && errors.productPrice}
                fullWidth
                margin="normal"
              />
              <Divider sx={{ margin: "10px 0" }}>Images</Divider>
              {isEdit && (
                <ManageProductGallery
                  images={product?.images}
                  refetch={refetch}
                  productId={product?.id || ""}
                />
              )}
              <Divider sx={{ margin: "10px 0" }}>Add images</Divider>
              <ImageUploading
                multiple
                value={imagesUploaded}
                onChange={handleImages}
                maxNumber={maxNumber}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <Stack gap={1} sx={{ marginBottom: "10px" }}>
                    <Button
                      style={isDragging ? { color: "red" } : undefined}
                      variant="contained"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </Button>
                    <Button
                      onClick={onImageRemoveAll}
                      variant="contained"
                      color="warning"
                    >
                      Remove all images
                    </Button>
                    <Stack flexDirection={"row"} flexWrap={"wrap"}>
                      {imageList.map((image, index) => (
                        <Stack
                          justifyContent={"center"}
                          key={image.dataURL}
                          alignItems={"center"}
                        >
                          <img src={image.dataURL} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <Button onClick={() => onImageUpdate(index)}>
                              Update
                            </Button>
                            <Button onClick={() => onImageRemove(index)}>
                              Remove
                            </Button>
                          </div>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                )}
              </ImageUploading>
              <Divider>Action</Divider>
              <Stack gap={1} sx={{ marginTop: "10px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                {isEdit && (
                  <Button
                    variant="contained"
                    color="error"
                    disabled={isSubmitting}
                    onClick={() => handleDeleteProduct(product?.id)}
                  >
                    Usuń
                  </Button>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

export default ManageProduct;
