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
import { deleteFromFavorite, getFavoriteCryptos } from "../../actions/auth";

const Home = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.crypto);
  const user = useSelector((state) => state.auth.authData);
  const favorite = useSelector((state) => state.favoriteCrypto);

  useEffect(() => {
    const refresh = setTimeout((xs) => {
      window.location.reload();
    }, 100000);

    return () => clearTimeout(refresh);
  }, []);

  useEffect(() => {
    dispatch(fetchAllCryptos());
    dispatch(getFavoriteCryptos(user?._id));
  }, [dispatch, user?._id]);

  const handleDeleteFromFavorites = (cryptoId, userId) => {
    dispatch(deleteFromFavorite(cryptoId, userId));
  };

  if (!cryptos.cryptocurrencies) {
    return <Loading />;
  }

  const favoriteCryptos = favorite?.cryptos || [];

  const renderingCryptos = cryptos.cryptocurrencies.filter((crypto) =>
    favoriteCryptos.includes(crypto._id)
  );

  return (
    <Container maxWidth="100%" style={{ marginTop: "150px" }}>
      <Grid container spacing={2}>
        {renderingCryptos.map((crypto) => (
          <Grid item xs={3} textAlign="left">
            <CardContent
              style={{ backgroundColor: "#f0faf0", borderRadius: "10px" }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <Typography variant="h5" component="div">
                    {capitalize(crypto.name)}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    ${crypto.price}
                  </Typography>
                  <Typography variant="body2">
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
                    style={{ color: "white", backgroundColor: "#171717" }}
                    disableElevation
                    onClick={() =>
                      handleDeleteFromFavorites(crypto._id, user?._id)
                    }
                  >
                    Remove
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
