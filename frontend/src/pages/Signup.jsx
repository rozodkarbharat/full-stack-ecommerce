import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { Register, SigninSuccess, SignupError, SignupLoading, SignupSuccess } from "../redux/user/action";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import signup from "../css/signup.module.css"
import { Alert, CircularProgress } from "@mui/material";
import Products from "./Products";
import Footer from "../components/footer";

const theme = createTheme();

const Signup = () => {
const {  isLoading, isError } = useSelector(
  (state) => state.authReducer.signup
);
const [name, setname] = React.useState("")
const [username, setusername] = React.useState("");
const [password, setpassword] = React.useState("")
// const [role, setrole] = React.useState("")
const navigate = useNavigate();
const dispatch=useDispatch()

 
  const handleSubmit = (e) => {
    e.preventDefault()
  dispatch(SignupLoading())
     axios
       .post("https://ecommerce-electronics.onrender.com/user/signup", {
         name,
         password,
         username,
       })
       .then((res) => dispatch(SignupSuccess(res.data)))
       .then(() => {
         navigate("/login");
       })
       .catch((err) => dispatch(SignupError(true)));
  };
if (isError) {
  setTimeout(togglerror, 3000);
  function togglerror() {
    dispatch(SignupError(false));
  }
  return (
    <Alert variant="filled" severity="error">
      Something went wrong please try again later.
    </Alert>
  );
}

  if(isLoading){
    return (
      <div className={signup.loading_div}>
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
            Sign Up
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
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => setusername(e.target.value)}
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
            <TextField
              margin="normal"
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <p>
            Already have an account? click to{" "}
            <span className={Products.span} onClick={() => navigate("/login")}>Login</span>
          </p>
        </Box>
      </Container>
    </ThemeProvider>
    <Footer/>
  </>
);
  }
  
};

export default Signup;
