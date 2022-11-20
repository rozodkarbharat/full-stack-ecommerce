import * as React from "react";
import Avatar from "@mui/material/Avatar";
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
import { json, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";

import { Alert, CircularProgress, InputLabel, MenuItem, Select, TextareaAutosize } from "@mui/material";
import login from "../css/login.module.css";
import Footer from "../components/footer";

const theme = createTheme();

const Create = () => {
    const [category, setcategory] = React.useState("")
    const [name, setname] = React.useState("");
    const [price, setprice] = React.useState("");
    const [image, setimage] = React.useState("");
    const [original_price, setoriginal_price] = React.useState("");
    const [description, setdescription] = React.useState("");
   const [loading, setloading] = React.useState(false)
   const [error, seterror] = React.useState(false)
   const [message, setmessage] = React.useState("")

  const { token, isLoading, isError } = useSelector(
    (state) => state.authReducer.login
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, image, category, description,original_price,price);
    if (+original_price < +price){
        setmessage(()=>"Selling price cannot be greaterr than original price")
        return
    }
    setloading(() => true);
    axios
      .post("http://localhost:5000/product/create", {
        name,
        image,
        category,
        description,
        original_price,
        price,
      })
      .then((res) =>{ setloading(()=>false) 
        setcategory("")
        setprice("")
        setoriginal_price("")
        setimage("")
        setdescription("")
        setname("")
        window.alert("Product Created successfully")})
      .catch((err) =>
      { setloading(()=>false)
       seterror(()=>true)});
  };
  if(message){
     setTimeout(togglerror, 5000);
     function togglerror() {
      setmessage("")
     }
  }
  if (error) {
    setTimeout(togglerror, 3000);
    function togglerror() {
      seterror(false);
    }
    return (
      <Alert variant="filled" severity="error">
        Something went wrong please try again later.
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className={login.loading_div}>
        <CircularProgress size="50px" />
      </div>
    );
  } 
  else {
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
                Create New Product
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
                  id="name"
                  label="Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Image"
                  label="Image Link"
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e) => setimage(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="original_price"
                  label="Original Price"
                  type="number"
                  id="original_price"
                  value={original_price}
                  onChange={(e) => setoriginal_price(e.target.value)}
                />
                <TextareaAutosize
                  aria-label="Description"
                  minRows={3}
                  placeholder="Description"
                  style={{ width: "100%", marginTop: "15px" }}
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  required
                />
                <p style={{ textAlign: "left" }}>Category :</p>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  //   onChange={handleChange}
                  autoWidth
                  label="Category"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"mobile"}>Mobile</MenuItem>
                  <MenuItem value={"television"}>Television</MenuItem>
                  <MenuItem value={"tablet"}>Tablet</MenuItem>
                </Select>
                <p style={{ color: "red" }}>{message}</p>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        <Footer />
      </>
    );
  }
};

export default Create;
