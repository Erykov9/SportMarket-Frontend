import Navigation from "./Navigation/Navigation";
import CartStore from "../../mobx/CartStore";
import { observer } from "mobx-react";

interface IHeaderProps {
  isLogged: boolean;
}

const Header: React.FC<IHeaderProps> = observer(({isLogged}) => {
  const { cartProducts } = CartStore;

  return (
    <header>
      <Navigation isLogged={isLogged} cart={cartProducts}/>
    </header>
  )
});

export default Header;