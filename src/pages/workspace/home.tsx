import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      Home
      <Link to="/authenticate/login">Login</Link>
    </div>
  )
}

export default Home;