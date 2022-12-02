import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import {  SigninError, SigninLoading, SigninSuccess } from "../redux/user/action";
import { Alert, CircularProgress } from "@mui/material";
import login from "../css/login.module.css"
import Footer from "../components/footer";

const theme = createTheme();

const Login=()=> {
   const { token,isLoading,isError} = useSelector((state) => state.authReducer.login);
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    
    e.preventDefault();
    dispatch(SigninLoading());
    axios
      .post("https://ecommerce-electronics.onrender.com/user/login", {
        username: email,
        password,
      })
      .then((res) => dispatch(SigninSuccess(res.data)))
      .then(() => navigate("/"))
      .catch((res) => dispatch(SigninError({ message: "Something went wrong", isError: false })));
    
  };
  if(isError){
    
    setTimeout(togglerror, 3000);
function togglerror(){
dispatch(SigninError({message:"",isError:false}));
}
    return (
      <Alert variant="filled" severity="error">
        Something went wrong please try again later.
      </Alert>
    );
  }

  if(isLoading){
    return (
      <div className={login.loading_div}>
        <CircularProgress size="50px" />
      </div>
    );
  }
  else{
return (
  <>
    <Navbar />
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
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
        <p>
          Don't have an account? click to{" "}
          <span onClick={() => navigate("/signup")}>signup</span>
        </p>
      </Container>
    </ThemeProvider>
    <Footer />
  </>
);
  }
  
}

export default Login;