import React, { useState } from "react";
import { Alert, Button, Container, Input, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCrypto } from "../../actions/crypto";

const initialState = {
  cryptoName: "",
};

function AddCrypto() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const errorMessage = useSelector((state) => state.crypto[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCrypto(formData));
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
      style={{ color: "white" }}
      component="main"
      maxWidth="xs"
    >
      <form onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
        <InputLabel htmlFor="cryptoName" style={{ color: "white" }}>
          Crypto Name
        </InputLabel>
        <Input
          style={{ color: "white" }}
          id="cryptoName"
          name="cryptoName"
          placeholder="Enter Here..."
          onChange={handleChange}
          autoFocus
          half
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "black",
            borderRadius: "20px",
            marginTop: "30px",
          }}
        >
          ADD
        </Button>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </form>
    </Container>
  );
}

export default AddCrypto;
