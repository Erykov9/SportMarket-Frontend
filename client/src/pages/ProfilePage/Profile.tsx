import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../mobx/AuthStore";
import { observer } from "mobx-react";
import styles from "./ProfilePage.module.scss";
import {
  Button,
  ButtonGroup,
  Divider,
} from "@mui/material";
import ProductCard from "./ProductCard/ProductCard";
import Popup from "../../components/Popup/Popup";
import ManageProduct from "../../components/ManageProduct/ManageProduct";
import Header from "../../layout/Header/Header";


const Profile = observer(() => {
  const navigate = useNavigate();
  const { userData, username } = AuthStore;
  const [isNewProductOpen, setIsNewProductOpen] = useState<boolean>(false);

  const handleProductOpen = () => {
    setIsNewProductOpen(!isNewProductOpen);
  };

  const refetch = () => {
    AuthStore.getUserByUsername(userData.username);
  }

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
    
  }, [userData]);

  return (
    <>
      <Header isLogged={true} />
      <div className={styles.profile}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2>
              Hello <span>{userData.username}</span>!
            </h2>
          </div>
          <div className={styles.menu}>
            <ButtonGroup size="medium" aria-label="Large button group">
              <Button color="secondary" variant="contained">Account Settings</Button>
              <Button color="secondary" variant="contained" onClick={() => handleProductOpen()}>Add new product</Button>
              <Button color="secondary" variant="contained">Manage orders</Button>
              <Button color="secondary" variant="contained">Your orders</Button>
            </ButtonGroup>
          </div>
          <Divider>
            <h3>
              {userData.products.length === 0
                ? "You have no products"
                : "Your products"}
            </h3>
          </Divider>
          <div className={styles.productsPanel}>
            <ProductCard products={userData.products} refetch={refetch}/>
          </div>
        </div>
        {isNewProductOpen && <Popup isOpen={isNewProductOpen} handleClose={handleProductOpen} title="Add new product"><ManageProduct isEdit={false} handleOpen={handleProductOpen} refetch={refetch}/></Popup>}
      </div>
    </>
  );
});

export default Profile;
