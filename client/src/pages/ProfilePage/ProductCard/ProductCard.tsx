import React, { useState } from 'react';
import styles from "../ProfilePage.module.scss";
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import moment from 'moment';
import Popup from "../../../components/Popup/Popup";
import ManageProduct from "../../../components/ManageProduct/ManageProduct";

interface IProductCard {
  products: Product[];
  refetch: () => void;
}

const ProductCard:React.FC<IProductCard> = ({products, refetch}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClick = (params: GridRowParams) => {
    setId(params.id as string);
    handleOpen();
  };

  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'Product', width: 220 },
    { field: 'createdAt', headerName: 'Created', width: 120, valueGetter: (date => moment(date).format("YYYY-MM-DD"))},
    { field: 'location', headerName: 'Location', width: 140 },
    {
      field: 'productPrice',
      headerName: 'Price',
      type: 'number',
      width: 90,
      valueGetter: (price => `${price} $`)
    },
  ];

  return (
    <div className={styles.product}>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        onRowClick={onClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        
      />
    </div>
    {isOpen && <Popup isOpen={isOpen} handleClose={handleOpen} title="Edit product"><ManageProduct id={id} isEdit={true} handleOpen={handleOpen} refetch={refetch}></ManageProduct></Popup>}
  </div>
  )
}

export default ProductCard