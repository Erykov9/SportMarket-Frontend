import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import { useEffect } from 'react';
import CategoriesStore from "./mobx/CategoriesStore";


function App() {
  useEffect(() => {
    CategoriesStore.fetch();
  }, []);
  
  return (
    <div className="App">
      <MainPage/>
    </div>
  );
}

export default App;
