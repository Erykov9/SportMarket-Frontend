import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';
import Categories from '../../layout/Categories/Categories';
import styles from "./MainPage.module.scss";
import FiltersBar from '../../components/Filters/FiltersBar';
import Products from '../../layout/Products/Products';
import FiltersAccordion from '../../components/Filters/FiltersAccordion';

const MainPage = () => {
  return (
    <div className={styles.mainpage}>
      <Header/>
      <Categories/>
      <FiltersBar/>
      <FiltersAccordion/>
      <Products/>
      <Footer/>
    </div>
  )
}

export default MainPage