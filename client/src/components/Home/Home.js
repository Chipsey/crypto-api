import React, { useEffect } from "react";
import { Container, capitalize } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { fetchAllCryptos } from "../../actions/crypto";

import Grid from "@mui/system/Unstable_Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Loading from "../Loading/Loading";

import "./style.css";
import { addToFavorite, getFavoriteCryptos } from "../../actions/auth";

const Home = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.crypto);
  const user = useSelector((state) => state.auth?.authData);

  useEffect(() => {
    const refresh = setTimeout(() => {
      window.location.reload();
    }, 10000);

    return () => clearTimeout(refresh);
  }, []);

  useEffect(() => {
    dispatch(fetchAllCryptos());
    dispatch(getFavoriteCryptos(user?._id));
  }, [dispatch, user?._id]);

  const handleAddToFavorites = (cryptoId, userId) => {
    // console.log(userId);
    dispatch(addToFavorite(cryptoId, userId));
  };

  if (!cryptos.cryptocurrencies) {
    return <Loading />;
  }
  return (
    <Container maxWidth="100%" style={{ marginTop: "150px" }}>
      <Grid container spacing={2}>
        {cryptos?.cryptocurrencies.map((crypto) => (
          <Grid item xs={3} textAlign="left">
            <CardContent
              style={{ backgroundColor: "#171717", borderRadius: "10px" }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <Typography variant="h5" component="div" color="white">
                    {capitalize(crypto.name)}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="lightgrey">
                    ${crypto.price}
                  </Typography>
                  <Typography variant="body2" color="grey">
                    Last Updated <br />
                    {crypto.updatedAt}
                  </Typography>
                </div>
                <img
                  src={crypto.symbol}
                  alt="Symbol"
                  style={{ position: "relative", width: "30%", height: "30%" }}
                />
              </div>
              <CardActions>
                {user?._id && (
                  <Button
                    size="small"
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#65ab69" }}
                    disableElevation
                    onClick={() => handleAddToFavorites(crypto._id, user?._id)}
                  >
                    Add to Favorites
                  </Button>
                )}
              </CardActions>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
