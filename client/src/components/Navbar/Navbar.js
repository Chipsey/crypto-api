import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/system/Box";
import decode from "jwt-decode";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

const mode = "dark";

const Item = styled(Link)(({ theme }) => ({
  border: "0px solid",
  borderColor: mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(2),
  borderRadius: "0px",
  textAlign: "center",
  letterSpacing: "1px",
  color: "#3D3B3A",
  textDecoration: "none",
  fontWeight: "500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "color 0.3s",
  "&:hover": {
    color: "gray",
  },
}));

const IconItem = styled(Item)(({ theme }) => ({
  "&:hover .icon-text": {
    opacity: 1,
  },
}));

const DropdownContent = styled("div")(({ theme }) => ({
  display: "none",
  position: "reletive",
  backgroundColor: "#f5f5f5",
  borderRadius: "5px",
  minWidth: "250px",
  textAlign: "left",
  zIndex: 1,
  top: "0px",
  opacity: 0,
  "&.show": {
    opacity: 1,
    display: "block",
  },
}));

const DropdownItem = styled("div")(({ theme }) => ({
  padding: "6px 12px",
  textDecoration: "none",
  display: "block",
  borderRadius: "10px",
  fontSize: "13px",
  marginTop: "5px",

  color: "black",
  "&:hover": {
    backgroundColor: "#e1e1e1",
  },
}));

const ProfileContainer = styled("div")(({ theme }) => ({
  position: "relative",
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.authData);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [logout, user?.token]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column", // Change to column layout
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
      }}
      style={{ position: "fixed", top: "0", width: "100%" }} // Add width: "100%" to stretch across the screen
      className="navbar"
    >
      <div className="navBack"></div>
      {userData ? (
        <Grid
          container
          position="relative"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 16, md: 24 }}
        >
          <Grid
            xs={2}
            sm={4}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Link to="/">
              <div
                style={{
                  position: "relative",
                  top: "0px",
                  overflow: "hidden",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                  alt="Logo"
                  width="40%"
                  style={{
                    objectFit: "cover",
                    position: "relative",
                    top: "0px",
                  }}
                />
              </div>
            </Link>
          </Grid>
          <Grid
            xs={2}
            sm={4}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Item to="/">
              <ExploreIcon
                style={{ marginRight: "5px", color: "black", fontSize: "15px" }}
              />
              <span className="icon-text">EXPLORE</span>
            </Item>
          </Grid>
          <Grid
            xs={2}
            sm={4}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Item to="/favorites">
              <FavoriteIcon
                style={{ marginRight: "5px", color: "black", fontSize: "15px" }}
              />
              <span className="icon-text">FAVORITES</span>
            </Item>
          </Grid>
          <Grid
            xs={2}
            sm={4}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Item to="/add">
              <ShoppingCartIcon
                style={{ marginRight: "5px", color: "black", fontSize: "15px" }}
              />
              <span className="icon-text">ADD CRYPTO</span>
            </Item>
          </Grid>
          <Grid
            xs={2}
            sm={8}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <ProfileContainer>
              <IconItem onClick={toggleDropdown}>
                <AccountCircleIcon
                  style={{
                    marginRight: "5px",
                    color: "black",
                    fontSize: "15px",
                  }}
                />
                <span
                  className="icon-text"
                  style={{ textTransform: "uppercase" }}
                >
                  {userData.name}'s Profile
                </span>
                {!isDropdownOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                <DropdownContent className={isDropdownOpen ? "show" : ""}>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownContent>
              </IconItem>
            </ProfileContainer>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 8, sm: 16, md: 24 }}
        >
          <Grid xs={2} sm={2}>
            <Item></Item>
          </Grid>
          <Grid xs={2} sm={5}>
            <Link to="/">
              <div
                style={{
                  position: "relative",
                  top: "0px",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                  alt="Logo"
                  width="40%"
                  style={{
                    objectFit: "cover",
                    position: "relative",
                    top: "0px",
                  }}
                />
              </div>
            </Link>
          </Grid>
          <Grid
            xs={2}
            sm={5}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Item to="/">
              <ExploreIcon
                style={{ marginRight: "5px", color: "black", fontSize: "15px" }}
              />
              <span className="icon-text">EXPLORE</span>
            </Item>
          </Grid>
          <Grid
            xs={2}
            sm={5}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Item to="/auth">
              <LoginIcon
                style={{ marginRight: "5px", color: "black", fontSize: "15px" }}
              />
              <span className="icon-text">SIGNUP/SIGNIN</span>
            </Item>{" "}
          </Grid>
          <Grid
            xs={2}
            sm={4}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // Change to column layout
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <Item to="/auth">
              <InfoIcon
                style={{ marginRight: "5px", color: "black", fontSize: "15px" }}
              />
              <span className="icon-text">INFO</span>
            </Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Navbar;
