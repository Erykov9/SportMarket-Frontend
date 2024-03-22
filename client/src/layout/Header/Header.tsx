import Navigation from "./Navigation/Navigation";

interface IHeaderProps {
  isLogged: boolean;
}

const Header: React.FC<IHeaderProps> = ({isLogged}) => {
  return (
    <header>
      <Navigation isLogged={isLogged}/>
    </header>
  )
}

export default Header