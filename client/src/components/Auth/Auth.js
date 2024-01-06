import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ShowPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const userData = useSelector((state) => state.auth.authData);
  const errorMessage = useSelector((state) => state.auth.authError);

  userData && navigate("/");

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevMode) => !prevMode);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, () => navigate("/")));
    } else {
      dispatch(signin(formData, () => navigate("/")));
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      component="main"
      maxWidth="xs"
    >
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
        style={{ width: "80%" }}
      >
        <Avatar
          sx={{ bgcolor: "secondary.main" }}
          style={{ background: "black" }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h6"
          sx={{ mt: 1, mb: 2, fontSize: "1rem" }}
          style={{ marginBottom: "30px" }}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <form onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
          <Grid container spacing={1}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={ShowPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            style={{
              background: "black",
              borderRadius: "20px",
              marginTop: "30px",
              padding: "5px 20px",
            }}
          >
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <Button
            onClick={switchMode}
            sx={{ alignSelf: "flex-end" }}
            style={{ fontSize: "0.7rem", color: "gray" }}
            fullWidth
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Still not Signed Up? Sign Up"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
