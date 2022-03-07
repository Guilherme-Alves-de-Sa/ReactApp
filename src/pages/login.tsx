import { fromPromise, useMutation } from "@apollo/react-hooks";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login, LoginUserInput, loginVariables } from "../api/graphQLModel";
import { LOGIN } from "../api/graphQLQueries";
import { useAppContext } from "../context/AppContext";
import './forms.css'
import { useFormik } from "formik";
import * as Yup from 'yup'
import { Button, TextField } from "@mui/material";
import { fork } from "child_process";

  const initialValues: LoginUserInput = {
      username:"",
      password:"",
    }

const Login = (props: any) => {
  const [loginMutation] = useMutation<login, loginVariables>(LOGIN)
  const { dispatch, state } = useAppContext();
  const location = useLocation()
  const navigate = useNavigate()

  const onSubmit = async (values: LoginUserInput) => {
    await loginMutation({
      variables: {
        loginInput: {
          password: values.password,
          username: values.username
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string()
          .email("Email inválido")
          .max(50,"Só pode conter no máximo 50 caracteres.")
          .required("É necessário inserir um email."),
      password: Yup.string()
          .min(4, "Password muito pequena")
          .required("É necessário introduzir uma password.")
          .matches(/[0-9]/, 'Password só pode conter letras.'),  
    }),
    onSubmit: onSubmit
  })
  console.log(formik.errors)

  // if user tries to login while being authenticated
  if (state.auth.isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <h1 className="title">Login</h1>
      <div className="main">
        <form onSubmit={formik.handleSubmit}>
          <div className="main">
            <TextField 
                fullWidth
                id="username"
                name="username"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value = {formik.values.username}
                error={!!formik.touched.username && !!formik.errors.username}

                      helperText={formik.touched.username && formik.errors.username}
            /><br/>
            <label className="text">Password: </label>
            <TextField 
                fullWidth
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value = {formik.values.password}
                error={!!formik.touched.password && !!formik.errors.password}

                      helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Button className="submit" type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default Login