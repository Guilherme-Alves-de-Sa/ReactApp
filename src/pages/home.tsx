import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { dispatch } = useAppContext()
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          dispatch({ type: "AUTH_LOGOUT" })
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Home