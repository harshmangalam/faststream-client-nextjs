import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Copyright from "../../components/Auth/Copyright";

import Alert from "@mui/material/Alert";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { removeAccessToken, storeAccessToken } from "../../utils/token";
import { useAuthDispatch } from "../../context/auth";
import { useRouter } from "next/router";
const schema = yup.object({
  username: yup.string().required().email(),
  password: yup.string().required(),
});

export default function SignIn() {
  const dispatch = useAuthDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async ({ username, password }) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    try {
      dispatch({ type: "SET_AUTH_LOADING", payload: true });
      const loginRes = await axios.post("/auth/login", data);
      const { access_token, token_type } = loginRes.data;
      // remove previous access token
      removeAccessToken();
      // set acces token in local storage (currying way)
      storeAccessToken(token_type)(access_token);

      // get current user

      const currentUserRes = await axios.get("/auth/me", {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      });

      // dispatch current user data

      dispatch({ type: "SET_CURRENTUSER", payload: currentUserRes.data });
      // show success toast

      // route to home page

      router.replace("/");
    } catch (error) {
      console.log(error.response.data);
      // set error
      setError("common", { message: error.response.data.detail });
    } finally {
      dispatch({ type: "SET_AUTH_LOADING", payload: false });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          {errors.common && (
            <Alert severity="error">{errors.common.message}</Alert>
          )}
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                autoComplete="email"
                autoFocus
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
