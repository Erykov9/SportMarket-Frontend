import React from "react";
import styles from "./ManageProductGallery.module.scss";
import SingleProductStore from "../../../mobx/SingleProductStore";
import { observer } from "mobx-react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from "@mui/material";

interface IManageProductGalleryProps {
  images?: Image[];
  refetch: () => void;
  productId: string;
}

const ManageProductGallery: React.FC<IManageProductGalleryProps> = observer(
  ({ images, refetch, productId }) => {
    if (!images || images.length === 0) {
      return (
        <h2 style={{ textAlign: "center", fontWeight: "300" }}>
          No photos in product gallery
        </h2>
      );
    }

    const removeHandler = async (id: string) => {
      await SingleProductStore.deleteImage(id);
      await SingleProductStore.fetch(productId);
      refetch();
    };

    return (
      <div className={styles.mpg}>
        {images.map((image) => (
          <div className={styles.mpgPhoto}>
            <Button color="error" onClick={() => removeHandler(image.id)}><DeleteForeverIcon/></Button>
            <img
              key={image.fileName}
              src={image.filePath}
              alt={image.fileName}
            />
          </div>
        ))}
      </div>
    );
  }
);

export default ManageProductGallery;
