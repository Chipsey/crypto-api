import React from "react";
import { Container, Grow } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "./styles.css";

const Loading = () => {
  return (
    <Grow in>
      <Container
        fullWidth
        style={{
          marginTop: "200px",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
        className="loading-background"
      >
        <div>
          <img
            src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
            alt="Loading"
            width="20%"
          />
        </div>
        <div>
          <CircularProgress />
        </div>
      </Container>
    </Grow>
  );
};

export default Loading;
