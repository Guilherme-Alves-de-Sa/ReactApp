import { useMutation } from "@apollo/react-hooks";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login, loginVariables } from "../api/graphQLModel";
import { LOGIN } from "../api/graphQLQueries";
import { useAppContext } from "../context/AppContext";

const Login = (props: any) => {
  const [loginMutation] = useMutation<login, loginVariables>(LOGIN)
  const { dispatch, state } = useAppContext();
  const location = useLocation()
  const navigate = useNavigate()

  // if user tries to login while being authenticated
  if (state.auth.isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const onSubmit = async () => {
    await loginMutation({
      variables: {
        loginInput: {
          password: "12345",
          username: "administrador@sevways.cloud"
        }
      }
    }).then((res) => {
      if (res.data) {
        // "state" is of type unknown, but we know "state" is passed as { from: location } in ProtectedRoutes Component
        // @ts-ignore 
        const from = location.state?.from?.pathname || "/";

        const { user, access_token } = res.data?.login
        dispatch({ type: 'AUTH_SETTOKEN', access_token });
        dispatch({ type: 'AUTH_SETUSER', user });
        navigate(from, { replace: true });
      }
    })
  }

  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          onSubmit()
        }}
      >
        Fake login
      </button>
    </>
  );
}

export default Login