import { Link } from "react-router-dom";
import "./Header.css"

function Header(){
  return(
    <>
      <h1>NC NEWS</h1>
        <nav>
          <Link to="/"> Home </Link> | 
          <Link to="/topics"> Topics </Link> | 
          <Link to="/articles"> Articles </Link> | 
          <Link to="/post_article"> Post </Link>
        </nav>
    </>
  )
}

export default Header