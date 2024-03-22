import Header from '../../layout/Header/Header';
import Categories from '../../layout/Categories/Categories';
import styles from "./MainPage.module.scss";
import FiltersBar from '../../components/Filters/FiltersBar';
import Products from '../../layout/Products/Products';
import FiltersAccordion from '../../components/Filters/FiltersAccordion';

interface IMainPageProps {
  isLogged: boolean;
}

const MainPage: React.FC<IMainPageProps> = ({isLogged}) => {
  return (
    <div className={styles.mainpage}>
      <Header isLogged={isLogged}/>
      <Categories/>
      <FiltersBar/>
      <FiltersAccordion/>
      <Products/>
    </div>
  )
}

export default MainPage