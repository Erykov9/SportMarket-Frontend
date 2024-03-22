import "./App.scss";
import MainPage from "./pages/MainPage/MainPage";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import FiltersBar from "./components/Filters/FiltersBar";
import { Divider } from "@mui/material";
import Footer from "./layout/Footer/Footer";
import { themeStyles } from "./utils/themeStyles";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import AuthStore from "./mobx/AuthStore";
import { useEffect } from "react";
import { observer } from "mobx-react";

const App = observer(() => {
  const { isUserLogged: isLogged } = AuthStore;
  
  useEffect(() => {
    AuthStore.isLogged();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage isLogged={isLogged}/>} />
        <Route
          path="/:id"
          element={
            <>
              <Header isLogged={isLogged}/>
              <FiltersBar/>
              <SingleProduct />
            </>
          }
        />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Divider>SportMarket 2024 &copy; <a href="https://linkedin.com/in/eryk-szczepanek" target="_blank" rel="noreferrer" style={{color: themeStyles.secondary}}>Erykov9</a></Divider>
      <Footer/>
    </div>
  );
});

export default App;
