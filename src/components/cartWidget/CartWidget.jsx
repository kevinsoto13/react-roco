import React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const CartWidget = () => {
  return (
    <>
      <Badge badgeContent={4} color="primary">
        <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
      </Badge>
    </>
  );
};
