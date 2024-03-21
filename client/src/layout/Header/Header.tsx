import Navigation from "./Navigation/Navigation";
import { useState } from "react";

const Header = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <header>
      <Navigation isLogged={isLogged}/>
    </header>
  )
}

export default Header