import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';
import Categories from '../../layout/Categories/Categories';
import styles from "./MainPage.module.scss";
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import Products from '../../layout/Products/Products';

const MainPage = () => {
  return (
    <div className={styles.mainpage}>
      <Header/>
      <Categories/>
      <FiltersBar/>
      <Products/>
      <Footer/>
    </div>
  )
}

export default MainPage