import Navigation from "./Navigation/Navigation";
import { useState } from "react";

const Header = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <div>
      <Navigation isLogged={isLogged}/>
    </div>
  )
}

export default Header